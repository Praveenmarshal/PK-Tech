// ── EmailJS config ───────────────────────────────────────────
// Replace these three values with your own from emailjs.com
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // Account → General → Public Key
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // Email Services → your service ID
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // Email Templates → your template ID

emailjs.init(EMAILJS_PUBLIC_KEY);

// ── Form submission ──────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const form   = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const payload = Object.fromEntries(new FormData(form).entries());
    status.textContent = "Sending message...";

    // Build the EmailJS template params matching your template variables
    const templateParams = {
      name:    payload.name    || "",
      email:   payload.email   || "",
      subject: payload.subject || "(no subject)",
      message: payload.message || "",
      time:    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    };

    try {
      // Send EmailJS notification to your Gmail — runs even if backend is down
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    } catch (emailErr) {
      console.warn("EmailJS failed:", emailErr);
      // Don't block the user — still try the backend
    }

    // Also send to backend (saves to MongoDB)
    try {
      await window.Zilist.api.post("/contact", payload);
    } catch (_) {}

    // Success feedback
    status.textContent = "Message sent! Praveen will get back to you shortly.";
    form.reset();
    if (window.gsap) {
      gsap.fromTo(status, { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 });
    }
  });
});
