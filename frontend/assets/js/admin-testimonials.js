document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-testimonial-form]");
  const table = document.querySelector("[data-admin-testimonials]");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      await window.Zilist.api.post("/testimonials", payload);
    } catch (error) {}
    table.insertAdjacentHTML("afterbegin", `<tr><td>${payload.name}</td><td>${payload.role}</td><td><span class="status-pill">Published</span></td></tr>`);
    form.reset();
  });
});

