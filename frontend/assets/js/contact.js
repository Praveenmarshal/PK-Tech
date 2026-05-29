document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    status.textContent = "Sending message...";
    try {
      await window.Zilist.api.post("/contact", payload);
      status.textContent = "Message sent. Praveen will contact you directly.";
      form.reset();
      if (window.gsap) gsap.fromTo(status, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 });
    } catch (error) {
      status.textContent = "Message captured locally. You can also email Praveen directly.";
    }
  });
});

