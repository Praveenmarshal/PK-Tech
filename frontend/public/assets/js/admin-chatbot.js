document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-knowledge-form]");
  const list = document.querySelector("[data-knowledge-list]");
  const test = document.querySelector("[data-chatbot-test]");
  let knowledge = [];

  // Load existing knowledge entries
  window.Zilist.api.get("/chatbot/knowledge").then((data) => {
    if (data.knowledge?.length) {
      knowledge = data.knowledge;
      render();
    }
  }).catch(() => {});

  function deleteRow(id, el) {
    if (!confirm("Delete this knowledge entry? This cannot be undone.")) return;
    window.Zilist.api.delete(`/chatbot/knowledge/${id}`).catch(() => {});
    knowledge = knowledge.filter((k) => k._id !== id);
    el.closest("tr").remove();
  }

  function render() {
    list.innerHTML = knowledge.map((k) => {
      const id = k._id || k.intent;
      return `<tr>
        <td>${k.intent}</td>
        <td>${k.answer}</td>
        <td><button class="btn-delete" data-id="${id}" title="Delete">🗑 Delete</button></td>
      </tr>`;
    }).join("");
    list.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", () => deleteRow(btn.dataset.id, btn));
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      await window.Zilist.api.post("/chatbot/knowledge", payload);
    } catch (error) {}
    knowledge.unshift(payload);
    render();
    form.reset();
  });

  test.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = test.message.value.trim();
    if (!message) return;
    const reply = window.Zilist.localAssistant(message);
    document.querySelector("[data-chatbot-output]").innerHTML +=
      `<p class="chat-msg user">${message}</p><p class="chat-msg">${reply}</p>`;
    test.reset();
  });
});
