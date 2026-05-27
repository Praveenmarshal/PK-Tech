document.addEventListener("DOMContentLoaded", async () => {
  const table = document.querySelector("[data-admin-messages]");
  let messages = window.ZilistAdmin.fallback.messages;
  try {
    const data = await window.Zilist.api.get("/contact/messages");
    messages = data.messages?.length ? data.messages : messages;
  } catch (error) {}
  table.innerHTML = messages.map((message) => `<tr><td>${message.name}</td><td>${message.email}</td><td>${message.subject}</td><td><span class="status-pill">${message.status || "New"}</span></td></tr>`).join("");
});

