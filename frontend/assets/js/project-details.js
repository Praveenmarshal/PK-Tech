const projectDetails = {
  "ai-chatbot-platform": {
    title: "AI Chatbot Platform",
    category: "AI Solution",
    summary: "An intelligent AI chatbot platform built for businesses that need customer support, onboarding, internal knowledge, and automated lead qualification.",
    features: ["AI-powered conversations", "Knowledge base retrieval", "Multi-language support", "Lead capture workflows", "Admin response review"],
    tech: ["Node.js", "Express", "MongoDB", "OpenAI", "Gemini", "JWT", "Cloudinary"],
    results: ["Faster response time", "Consistent support quality", "Reusable AI knowledge system"],
    challenges: ["Designing safe fallback answers", "Keeping admin controls simple", "Balancing automation and human handoff"]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const slug = new URLSearchParams(window.location.search).get("slug") || "ai-chatbot-platform";
  const detail = projectDetails[slug] || projectDetails["ai-chatbot-platform"];
  document.querySelectorAll("[data-project-title]").forEach((node) => { node.textContent = detail.title; });
  document.querySelector("[data-project-summary]").textContent = detail.summary;
  document.querySelector("[data-project-category]").textContent = detail.category;
  document.querySelector("[data-project-features]").innerHTML = detail.features.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("[data-project-tech]").innerHTML = detail.tech.map((item) => `<span class="tag">${item}</span>`).join("");
  document.querySelector("[data-project-results]").innerHTML = detail.results.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("[data-project-challenges]").innerHTML = detail.challenges.map((item) => `<li>${item}</li>`).join("");
});

