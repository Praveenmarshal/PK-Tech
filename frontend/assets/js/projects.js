const fallbackProjects = [
  { title: "AI Chatbot Platform", category: "AI Solution", summary: "Multilingual assistant with knowledge retrieval, admin controls, and analytics.", slug: "ai-chatbot-platform" },
  { title: "Analytics Dashboard", category: "Dashboard", summary: "Executive metrics, business intelligence, realtime reporting, and insights.", slug: "analytics-dashboard" },
  { title: "Gym Management System", category: "Full Application", summary: "Member operations, plans, attendance, payments, and staff workflows.", slug: "gym-management-system" },
  { title: "AI Automation Platform", category: "Automation", summary: "Business workflows that remove manual tasks and connect APIs.", slug: "ai-automation-platform" },
  { title: "Cybersecurity Dashboard", category: "Security", summary: "Threat visibility, events, controls, and incident triage experiences.", slug: "cybersecurity-dashboard" },
  { title: "Portfolio System", category: "Web Development", summary: "Premium personal brand ecosystem connected to projects and content.", slug: "portfolio-system" }
];


const projectImages = {
  "ai-chatbot-platform":     "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  "analytics-dashboard":     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  "gym-management-system":   "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
  "ai-automation-platform":  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
  "cybersecurity-dashboard": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80",
  "portfolio-system":        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
};
const defaultProjectImg = "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80";

function renderProjects(projects) {
  const grid = document.querySelector("[data-project-grid]");
  if (!grid) return;
  grid.innerHTML = projects.map((project) => `
    <article class="project-card" data-category="${project.category}">
      <img class="card-img" src="${projectImages[project.slug] || defaultProjectImg}" alt="${project.title}" loading="lazy">
      <div class="card-body">
        <span class="tag">${project.category}</span>
        <h3 class="card-title">${project.title}</h3>
        <p class="card-copy">${project.summary || project.description || ""}</p>
        <a class="btn btn-secondary" href="project-details.html?slug=${project.slug || encodeURIComponent(project.title.toLowerCase().replaceAll(" ", "-"))}">View Project</a>
      </div>
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

