document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-knowledge-form]");
  const list = document.querySelector("[data-knowledge-list]");
  const test = document.querySelector("[data-chatbot-test]");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      await window.Zilist.api.post("/chatbot/knowledge", payload);
    } catch (error) {}
    list.insertAdjacentHTML("afterbegin", `<tr><td>${payload.intent}</td><td>${payload.answer}</td></tr>`);
    form.reset();
  });
  test.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = test.message.value.trim();
    if (!message) return;
    const reply = window.Zilist.localAssistant(message);
    document.querySelector("[data-chatbot-output]").innerHTML += `<p class="chat-msg user">${message}</p><p class="chat-msg">${reply}</p>`;
    test.reset();
  });
});

