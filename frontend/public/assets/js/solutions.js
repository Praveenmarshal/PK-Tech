document.addEventListener("DOMContentLoaded", () => {
  if (window.gsap) {
    gsap.from(".solution-stack .solution-card", { x: -22, opacity: 0, stagger: 0.08, duration: 0.72, ease: "power2.out" });
  }
});

