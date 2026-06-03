document.addEventListener("DOMContentLoaded", () => {
  if (window.gsap) {
    gsap.to(".orbital-stage", { y: -16, duration: 4.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.from(".trust-panel", { y: 18, opacity: 0, delay: 0.55, duration: 0.7, ease: "power2.out" });
  }
});

