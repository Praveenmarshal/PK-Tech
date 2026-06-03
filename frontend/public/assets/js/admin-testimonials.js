document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-testimonial-form]");
  const table = document.querySelector("[data-admin-testimonials]");
  let testimonials = [];

  // Load existing
  window.Zilist.api.get("/testimonials").then((data) => {
    if (data.testimonials?.length) {
      testimonials = data.testimonials;
      render();
    }
  }).catch(() => {});

  function deleteRow(id, el) {
    if (!confirm("Delete this testimonial? This cannot be undone.")) return;
    window.Zilist.api.delete(`/testimonials/${id}`).catch(() => {});
    testimonials = testimonials.filter((t) => t._id !== id);
    el.closest("tr").remove();
  }

  function render() {
    table.innerHTML = testimonials.map((t) => {
      const id = t._id || t.name;
      return `<tr>
        <td>${t.name}</td>
        <td>${t.role || ""}</td>
        <td><span class="status-pill">Published</span></td>
        <td><button class="btn-delete" data-id="${id}" title="Delete">🗑 Delete</button></td>
      </tr>`;
    }).join("");
    table.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", () => deleteRow(btn.dataset.id, btn));
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const data = await window.Zilist.api.post("/testimonials", payload);
      testimonials.unshift(data.testimonial || payload);
    } catch (error) {
      testimonials.unshift(payload);
    }
    render();
    form.reset();
  });
});
