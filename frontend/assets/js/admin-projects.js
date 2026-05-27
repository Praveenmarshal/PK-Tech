document.addEventListener("DOMContentLoaded", async () => {
  const table = document.querySelector("[data-admin-projects]");
  const form = document.querySelector("[data-project-form]");
  let projects = window.ZilistAdmin.fallback.projects;
  try {
    const data = await window.Zilist.api.get("/projects/admin");
    projects = data.projects?.length ? data.projects : projects;
  } catch (error) {}
  function render() {
    table.innerHTML = projects.map((project) => `<tr><td>${project.title}</td><td>${project.category}</td><td><span class="status-pill">${project.status || "Draft"}</span></td></tr>`).join("");
  }
  render();
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const data = await window.Zilist.api.post("/projects", payload);
      projects.unshift(data.project || payload);
    } catch (error) {
      projects.unshift({ ...payload, status: "Draft" });
    }
    render();
    form.reset();
  });
});

