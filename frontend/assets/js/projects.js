const fallbackProjects = [
  { title: "AI Chatbot Platform", category: "AI Solution", summary: "Multilingual assistant with knowledge retrieval, admin controls, and analytics.", slug: "ai-chatbot-platform" },
  { title: "Analytics Dashboard", category: "Dashboard", summary: "Executive metrics, business intelligence, realtime reporting, and insights.", slug: "analytics-dashboard" },
  { title: "Gym Management System", category: "Full Application", summary: "Member operations, plans, attendance, payments, and staff workflows.", slug: "gym-management-system" },
  { title: "AI Automation Platform", category: "Automation", summary: "Business workflows that remove manual tasks and connect APIs.", slug: "ai-automation-platform" },
  { title: "Cybersecurity Dashboard", category: "Security", summary: "Threat visibility, events, controls, and incident triage experiences.", slug: "cybersecurity-dashboard" },
  { title: "Portfolio System", category: "Web Development", summary: "Premium personal brand ecosystem connected to projects and content.", slug: "portfolio-system" }
];

function renderProjects(projects) {
  const grid = document.querySelector("[data-project-grid]");
  if (!grid) return;
  grid.innerHTML = projects.map((project) => `
    <article class="project-card" data-category="${project.category}">
      <div class="visual-card"></div>
      <span class="tag">${project.category}</span>
      <h3 class="card-title">${project.title}</h3>
      <p class="card-copy">${project.summary || project.description || ""}</p>
      <a class="btn btn-secondary" href="project-details.html?slug=${project.slug || encodeURIComponent(project.title.toLowerCase().replaceAll(" ", "-"))}">View Project</a>
    </article>
  `).join("");
}

document.addEventListener("DOMContentLoaded", async () => {
  let projects = fallbackProjects;
  try {
    const data = await window.Zilist.api.get("/projects");
    projects = data.projects?.length ? data.projects : fallbackProjects;
  } catch (error) {}
  renderProjects(projects);
  document.querySelectorAll("[data-project-filter]").forEach((filter) => {
    filter.addEventListener("click", () => {
      document.querySelectorAll("[data-project-filter]").forEach((item) => item.classList.remove("is-active"));
      filter.classList.add("is-active");
      const category = filter.dataset.projectFilter;
      renderProjects(category === "All" ? projects : projects.filter((project) => project.category === category));
    });
  });
});

