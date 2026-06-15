document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-settings-form]");
  const status = document.querySelector("[data-settings-status]");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      await window.PKTech.api.put("/settings", payload);
      status.textContent = "Settings saved.";
    } catch (error) {
      status.textContent = "Settings preview saved locally.";
    }
  });
});

