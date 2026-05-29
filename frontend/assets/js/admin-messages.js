document.addEventListener("DOMContentLoaded", async () => {
  const table = document.querySelector("[data-admin-messages]");
  let messages = window.ZilistAdmin.fallback.messages;
  try {
    const data = await window.Zilist.api.get("/contact/messages");
    messages = data.messages?.length ? data.messages : messages;
  } catch (error) {}

  function deleteRow(id, el) {
    if (!confirm("Delete this message? This cannot be undone.")) return;
    window.Zilist.api.delete(`/contact/messages/${id}`).catch(() => {});
    messages = messages.filter((m) => m._id !== id);
    el.closest("tr").remove();
  }

  function render() {
    table.innerHTML = messages.map((message) => {
      const id = message._id || message.email;
      return `<tr>
        <td>${message.name}</td>
        <td>${message.email}</td>
        <td>${message.subject}</td>
        <td><span class="status-pill">${message.status || "New"}</span></td>
        <td><button class="btn-delete" data-id="${id}" title="Delete">🗑 Delete</button></td>
      </tr>`;
    }).join("");
    table.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", () => deleteRow(btn.dataset.id, btn));
    });
  }

  render();
});
