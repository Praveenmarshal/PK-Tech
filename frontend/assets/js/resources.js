const fallbackResources = [
  { title: "The Future of AI Automation", category: "AI Automation", date: "May 12, 2026", slug: "future-of-ai-automation" },
  { title: "Building Smarter AI Chatbots", category: "Tutorial", date: "May 5, 2026", slug: "building-smarter-ai-chatbots" },
  { title: "AI in Business: A Complete Guide", category: "Guide", date: "May 1, 2026", slug: "ai-business-guide" },
  { title: "Prompt Engineering Guide", category: "Prompt Guides", date: "Apr 25, 2026", slug: "prompt-engineering-guide" },
  { title: "AI Tools for Developers", category: "AI Tools", date: "Apr 20, 2026", slug: "ai-tools-for-developers" },
  { title: "How AI is Changing Industries", category: "Articles", date: "Apr 15, 2026", slug: "ai-changing-industries" }
];

function renderResources(resources) {
  const grid = document.querySelector("[data-resource-grid]");
  grid.innerHTML = resources.map((resource) => `
    <article class="resource-card" data-category="${resource.category}">
      <div class="visual-card"></div>
      <span class="tag">${resource.category}</span>
      <h3 class="card-title">${resource.title}</h3>
      <p class="card-copy">${resource.date || ""}</p>
      <a class="btn btn-secondary" href="resource-details.html?slug=${resource.slug || ""}">Read Resource</a>
    </article>
  `).join("");
}

document.addEventListener("DOMContentLoaded", async () => {
  let resources = fallbackResources;
  try {
    const data = await window.Zilist.api.get("/resources");
    resources = data.resources?.length ? data.resources : fallbackResources;
  } catch (error) {}
  renderResources(resources);

  const search = document.querySelector("[data-resource-search]");
  const filters = document.querySelectorAll("[data-resource-filter]");
  function apply() {
    const term = search.value.toLowerCase();
    const active = document.querySelector("[data-resource-filter].is-active")?.dataset.resourceFilter || "All";
    renderResources(resources.filter((item) => {
      const matchesTerm = item.title.toLowerCase().includes(term) || item.category.toLowerCase().includes(term);
      const matchesFilter = active === "All" || item.category === active;
      return matchesTerm && matchesFilter;
    }));
  }
  search.addEventListener("input", apply);
  filters.forEach((filter) => filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("is-active"));
    filter.classList.add("is-active");
    apply();
  }));
});

