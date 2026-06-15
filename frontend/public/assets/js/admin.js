(function () {
  const adminLinks = [
    ["Dashboard", "admin-dashboard.html", "dashboard"],
    ["Projects", "admin-projects.html", "projects"],
    ["Resources", "admin-resources.html", "resources"],
    ["Messages", "admin-messages.html", "messages"],
    ["Payments", "admin-payments.html", "payments"],
    ["Testimonials", "admin-testimonials.html", "testimonials"],
    ["Analytics", "admin-dashboard.html#analytics", "analytics"],
    ["Chatbot", "admin-chatbot.html", "chatbot"],
    ["Settings", "admin-settings.html", "settings"]
  ];

  function token() {
    return localStorage.getItem("pktech_admin_token");
  }

  function guard() {
    if (!token() && document.body.dataset.admin !== "login") {
      window.location.href = "admin-login.html";
      return false;
    }
    return true;
  }

  function renderSidebar() {
    const target = document.querySelector("[data-admin-sidebar]");
    if (!target) return;
    const page = document.body.dataset.admin || "";
    target.innerHTML = `
      <aside class="admin-sidebar">
        <p class="admin-brand">PK Tech Admin</p>
        <nav class="admin-nav">
          ${adminLinks.map(([label, href, key]) => `<a class="${page === key ? "is-active" : ""}" href="${href}">${label}</a>`).join("")}
          <button class="admin-logout" type="button" data-admin-logout>Logout</button>
        </nav>
      </aside>
    `;
    target.querySelector("[data-admin-logout]")?.addEventListener("click", () => {
      localStorage.removeItem("pktech_admin_token");
      localStorage.removeItem("pktech_admin_user");
      window.location.href = "admin-login.html";
    });
  }

  function adminFetch(path, options = {}) {
    return window.PKTech.api[options.methodName || "get"] ? window.PKTech.api[options.methodName || "get"](path, options.body) : Promise.reject(new Error("API unavailable"));
  }

  window.PKTechAdmin = {
    guard,
    renderSidebar,
    token,
    adminFetch,
    fallback: {
      projects: [
        { title: "AI Chatbot Platform", category: "AI Solution", status: "Published" },
        { title: "Analytics Dashboard", category: "Dashboard", status: "Published" },
        { title: "Gym Management System", category: "Full Application", status: "Published" }
      ],
      resources: [
        { title: "The Future of AI Automation", category: "AI Automation", status: "Published" },
        { title: "Building Smarter AI Chatbots", category: "Tutorial", status: "Published" }
      ],
      messages: [
        { name: "Rohan Verma", subject: "AI Chatbot Project", email: "client@example.com", status: "New" },
        { name: "Nila Shah", subject: "Dashboard Development", email: "hello@example.com", status: "Reviewed" }
      ]
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (!guard()) return;
    renderSidebar();
  });
})();

