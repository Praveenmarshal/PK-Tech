document.addEventListener("DOMContentLoaded", () => {
  if (window.gsap) {
    gsap.from(".portrait-orbit", { rotate: -4, scale: 0.96, opacity: 0, duration: 0.8, ease: "power2.out" });
    gsap.from(".timeline-item", { y: 18, opacity: 0, stagger: 0.08, delay: 0.2, duration: 0.6 });
  }
});

