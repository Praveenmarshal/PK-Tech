document.addEventListener("DOMContentLoaded", () => {
  const portfolio = window.PKTech.owner.portfolio;
  document.querySelectorAll("[data-portfolio-link]").forEach((link) => { link.href = portfolio; });
  if (window.gsap) {
    gsap.to(".portfolio-redirect .orbital-stage", { rotate: 360, duration: 24, repeat: -1, ease: "none" });
  }
});

