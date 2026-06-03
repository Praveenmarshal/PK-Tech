const fallbackResources = [
  { title: "The Future of AI Automation", category: "AI Automation", date: "May 12, 2026", slug: "future-of-ai-automation" },
  { title: "Building Smarter AI Chatbots", category: "Tutorial", date: "May 5, 2026", slug: "building-smarter-ai-chatbots" },
  { title: "AI in Business: A Complete Guide", category: "Guide", date: "May 1, 2026", slug: "ai-business-guide" },
  { title: "Prompt Engineering Guide", category: "Prompt Guides", date: "Apr 25, 2026", slug: "prompt-engineering-guide" },
  { title: "AI Tools for Developers", category: "AI Tools", date: "Apr 20, 2026", slug: "ai-tools-for-developers" },
  { title: "How AI is Changing Industries", category: "Articles", date: "Apr 15, 2026", slug: "ai-changing-industries" }
];


const resourceImages = {
  "future-of-ai-automation":      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
  "building-smarter-ai-chatbots": "https://images.unsplash.com/photo-1676299081847-824916de030a?w=600&q=80",
  "ai-business-guide":            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  "prompt-engineering-guide":     "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=600&q=80",
  "ai-tools-for-developers":      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80",
  "ai-changing-industries":       "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
};
const defaultResourceImg = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80";

function renderResources(resources) {
  const grid = document.querySelector("[data-resource-grid]");
  grid.innerHTML = resources.map((resource) => `
    <article class="resource-card" data-category="${resource.category}">
      <img class="card-img" src="${resourceImages[resource.slug] || defaultResourceImg}" alt="${resource.title}" loading="lazy">
      <div class="card-body">
        <span class="tag">${resource.category}</span>
        <h3 class="card-title">${resource.title}</h3>
        <p class="card-copy">${resource.date || ""}</p>
        <a class="btn btn-secondary" href="resource-details.html?slug=${resource.slug || ""}">Read Resource</a>
      </div>
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

