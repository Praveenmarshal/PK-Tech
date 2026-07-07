const SYSTEM_PROMPT = [
  "You are PK_Tech_Warrior AI Assistant.",
  "Answer only about PK_Tech_Warrior, Praveen Kannan, services, projects, technologies, contact details, and website navigation.",
  "Be concise, premium, calm, and helpful.",
  "Contact: praveenkicha01@gmail.com, +91 8825870266, LinkedIn https://www.linkedin.com/in/praveen-kannan-6862382a2, GitHub https://github.com/Praveenmarshal, Portfolio https://praveen-kannan-4607.vercel.app/.",
  "PK_Tech_Warrior builds intelligent AI systems, automated solutions, and digital platforms.",
  "Services include: AI & Machine Learning, Web Development, Data Analytics, Automation Systems, Cybersecurity, AI Dashboards, Data Science, and AI Business Solutions.",
  "Projects: AI Chatbot Platform, Analytics Dashboard, Gym Management System, AI Automation Platform, Cybersecurity Dashboard, and Portfolio System."
].join(" ");

function localFallback(message) {
  const text = (message || "").toLowerCase();
  if (text.includes("contact") || text.includes("email") || text.includes("phone")) {
    return "Contact Praveen at praveenkicha01@gmail.com or call +91 8825870266. LinkedIn: linkedin.com/in/praveen-kannan-6862382a2";
  }
  if (text.includes("project") || text.includes("portfolio")) {
    return "PK_Tech_Warrior projects include: AI Chatbot Platform, Analytics Dashboard, Gym Management System, AI Automation Platform, Cybersecurity Dashboard, and Portfolio System. Visit the Projects page for details!";
  }
  if (text.includes("service") || text.includes("build") || text.includes("offer")) {
    return "PK_Tech_Warrior offers: AI & Machine Learning, Web Development, Data Analytics, Automation Systems, Cybersecurity, AI Dashboards, Data Science, and AI Business Solutions.";
  }
  if (text.includes("about") || text.includes("pk_tech") || text.includes("who")) {
    return "PK_Tech_Warrior is Praveen Kannan's premium AI company — building futuristic AI systems, chatbots, automation platforms, dashboards, and full-stack digital experiences. 🚀";
  }
  return "I can help with PK_Tech_Warrior services, projects, contact info, and more. Ask me anything or contact Praveen at praveenkicha01@gmail.com! 💫";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // If no API key, use local fallback
  if (!apiKey || apiKey.includes("<") || apiKey === "") {
    return res.status(200).json({
      reply: localFallback(message),
      provider: "local"
    });
  }

  try {
    const model = process.env.GEMINI_MODEL || "gemini-2.5-pro";
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${message}` }]
          }]
        })
      }
    );

    if (!response.ok) {
      console.error(`Gemini API error: ${response.status}`);
      return res.status(200).json({
        reply: localFallback(message),
        provider: "local"
      });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (reply) {
      return res.status(200).json({ reply, provider: "gemini" });
    }

    return res.status(200).json({
      reply: localFallback(message),
      provider: "local"
    });
  } catch (error) {
    console.error("Chat API error:", error.message);
    return res.status(200).json({
      reply: localFallback(message),
      provider: "local"
    });
  }
}
