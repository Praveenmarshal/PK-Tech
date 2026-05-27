document.addEventListener("DOMContentLoaded", async () => {
  const table = document.querySelector("[data-admin-resources]");
  const form = document.querySelector("[data-resource-form]");
  let resources = window.ZilistAdmin.fallback.resources;
  try {
    const data = await window.Zilist.api.get("/resources/admin");
    resources = data.resources?.length ? data.resources : resources;
  } catch (error) {}
  function render() {
    table.innerHTML = resources.map((item) => `<tr><td>${item.title}</td><td>${item.category}</td><td><span class="status-pill">${item.status || "Published"}</span></td></tr>`).join("");
  }
  render();
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const data = await window.Zilist.api.post("/resources", payload);
      resources.unshift(data.resource || payload);
    } catch (error) {
      resources.unshift({ ...payload, status: "Draft" });
    }
    render();
    form.reset();
  });
});

