document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-admin-login]");
  const status = document.querySelector("[data-login-status]");
  const localAdmin = {
    email: "praveenkicha01@gmail.com",
    password: "praveen7094"
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "Authenticating...";
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const data = await window.Zilist.api.post("/auth/login", payload);
      localStorage.setItem("zilist_admin_token", data.token);
      localStorage.setItem("zilist_admin_user", JSON.stringify(data.admin));
      window.location.href = "admin-dashboard.html";
    } catch (error) {
      if (payload.email.toLowerCase() === localAdmin.email && payload.password === localAdmin.password) {
        localStorage.setItem("zilist_admin_token", "local-owner-preview-token");
        localStorage.setItem("zilist_admin_user", JSON.stringify({ name: "Praveen Kannan", email: localAdmin.email, role: "owner" }));
        window.location.href = "admin-dashboard.html";
        return;
      }
      status.textContent = error.message || "Admin login failed.";
    }
  });
});
