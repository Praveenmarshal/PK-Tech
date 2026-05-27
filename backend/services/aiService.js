const { localKnowledgeAnswer } = require("./knowledgeBase");

function systemPrompt() {
  return [
    "You are ZILIST AI Assistant.",
    "Answer only about ZILIST, Praveen Kannan, services, projects, technologies, contact details, and website navigation.",
    "Be concise, premium, calm, and helpful.",
    "Contact: praveenkicha01@gmail.com, +91 8825870266, LinkedIn https://www.linkedin.com/in/praveen-kannan-6862382a2, GitHub https://github.com/Praveenmarshal, Portfolio https://praveen-kannan-4607.vercel.app/."
  ].join(" ");
}

async function askOpenAI(message) {
  if (!process.env.OPENAI_API_KEY) return null;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt() },
        { role: "user", content: message }
      ],
      temperature: 0.35
    })
  });
  if (!response.ok) throw new Error("OpenAI provider failed");
  const data = await response.json();
  return data.choices?.[0]?.message?.content || null;
}

async function askGemini(message) {
  if (!process.env.GEMINI_API_KEY) return null;
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${systemPrompt()}\n\nUser: ${message}` }] }]
    })
  });
  if (!response.ok) throw new Error("Gemini provider failed");
  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
}

async function askAssistant(message) {
  try {
    const openai = await askOpenAI(message);
    if (openai) return { reply: openai, provider: "openai" };
  } catch (error) {
    console.warn(error.message);
  }

  try {
    const gemini = await askGemini(message);
    if (gemini) return { reply: gemini, provider: "gemini" };
  } catch (error) {
    console.warn(error.message);
  }

  return { reply: localKnowledgeAnswer(message), provider: "local" };
}

module.exports = { askAssistant };

