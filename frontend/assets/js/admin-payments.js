document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-payment-form]");
  const list = document.querySelector("[data-payment-list]");
  let payments = [];

  // Load existing payments
  window.Zilist.api.get("/payments").then((data) => {
    if (data.payments?.length) {
      payments = data.payments;
      render();
    }
  }).catch(() => {});

  function deleteRow(id, el) {
    if (!confirm("Delete this payment record? This cannot be undone.")) return;
    window.Zilist.api.delete(`/payments/${id}`).catch(() => {});
    payments = payments.filter((p) => p._id !== id);
    el.closest("tr").remove();
  }

  function render() {
    list.innerHTML = payments.map((p) => {
      const id = p._id || p.clientName;
      return `<tr>
        <td>${p.clientName || p.client || ""}</td>
        <td>${p.projectName || p.project || ""}</td>
        <td><span class="status-pill">${p.status || "Uploaded"}</span></td>
        <td><button class="btn-delete" data-id="${id}" title="Delete">🗑 Delete</button></td>
      </tr>`;
    }).join("");
    list.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", () => deleteRow(btn.dataset.id, btn));
    });
  }

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
    payments.unshift({ ...payload, status: "Uploaded" });
    render();
    form.reset();
  });
});
