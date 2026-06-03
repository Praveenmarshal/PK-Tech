document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--y", `${event.clientY - rect.top}px`);
    });
  });
  if (window.gsap) {
    gsap.from(".features-mosaic .feature-card", { scale: 0.96, opacity: 0, stagger: 0.06, duration: 0.62, ease: "power2.out" });
  }
});

