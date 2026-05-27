document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-payment-form]");
  const list = document.querySelector("[data-payment-list]");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      if (formData.get("screenshot")?.name) {
        const response = await fetch(`${window.Zilist.apiBase}/payments/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${window.ZilistAdmin.token()}` },
          body: formData
        });
        if (!response.ok) throw new Error("Upload failed");
      } else {
        await window.Zilist.api.post("/payments", payload);
      }
    } catch (error) {}
    list.insertAdjacentHTML("afterbegin", `<tr><td>${payload.clientName}</td><td>${payload.projectName}</td><td><span class="status-pill">Uploaded</span></td></tr>`);
    form.reset();
  });
});
