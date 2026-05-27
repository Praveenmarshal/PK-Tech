document.addEventListener("DOMContentLoaded", () => {
  const slug = new URLSearchParams(window.location.search).get("slug") || "future-of-ai-automation";
  const readable = slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  document.querySelectorAll("[data-resource-title]").forEach((node) => { node.textContent = readable; });
  if (window.gsap) {
    gsap.from(".article-body h2, .article-body p", { y: 14, opacity: 0, stagger: 0.05, duration: 0.55 });
  }
});

