document.addEventListener("DOMContentLoaded", async () => {
  const table = document.querySelector("[data-admin-resources]");
  const form = document.querySelector("[data-resource-form]");
  let resources = window.PKTechAdmin.fallback.resources;
  try {
    const data = await window.PKTech.api.get("/resources/admin");
    resources = data.resources?.length ? data.resources : resources;
  } catch (error) {}

  function deleteRow(id, el) {
    if (!confirm("Delete this resource? This cannot be undone.")) return;
    window.PKTech.api.delete(`/resources/${id}`).catch(() => {});
    resources = resources.filter((r) => (r._id || r.slug) !== id);
    el.closest("tr").remove();
  }

  function render() {
    table.innerHTML = resources.map((item) => {
      const id = item._id || item.slug || item.title;
      return `<tr>
        <td>${item.title}</td>
        <td>${item.category}</td>
        <td><span class="status-pill">${item.status || "Published"}</span></td>
        <td><button class="btn-delete" data-id="${id}" title="Delete">🗑 Delete</button></td>
      </tr>`;
    }).join("");
    table.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", () => deleteRow(btn.dataset.id, btn));
    });
  }

  render();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const data = await window.PKTech.api.post("/resources", payload);
      resources.unshift(data.resource || payload);
    } catch (error) {
      resources.unshift({ ...payload, status: "Draft" });
    }
    render();
    form.reset();
  });
});
