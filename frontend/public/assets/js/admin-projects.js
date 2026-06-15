document.addEventListener("DOMContentLoaded", async () => {
  const table = document.querySelector("[data-admin-projects]");
  const form = document.querySelector("[data-project-form]");
  let projects = window.PKTechAdmin.fallback.projects;
  try {
    const data = await window.PKTech.api.get("/projects/admin");
    projects = data.projects?.length ? data.projects : projects;
  } catch (error) {}

  function deleteRow(id, el) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    window.PKTech.api.delete(`/projects/${id}`).catch(() => {});
    projects = projects.filter((p) => (p._id || p.slug) !== id);
    el.closest("tr").remove();
  }

  function render() {
    table.innerHTML = projects.map((project) => {
      const id = project._id || project.slug || project.title;
      return `<tr>
        <td>${project.title}</td>
        <td>${project.category}</td>
        <td><span class="status-pill">${project.status || "Draft"}</span></td>
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
      const data = await window.PKTech.api.post("/projects", payload);
      projects.unshift(data.project || payload);
    } catch (error) {
      projects.unshift({ ...payload, status: "Draft" });
    }
    render();
    form.reset();
  });
});
