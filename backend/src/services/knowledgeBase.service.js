const owner = {
  email: "praveenkicha01@gmail.com",
  phone: "+91 8825870266",
  portfolio: "https://praveen-kannan-4607.vercel.app/",
  linkedin: "https://www.linkedin.com/in/praveen-kannan-6862382a2",
  github: "https://github.com/Praveenmarshal"
};

const entries = [
  {
    intents: ["about", "zilist", "company"],
    answer: "ZILIST is Praveen Kannan's premium AI company for AI systems, chatbots, automation platforms, dashboards, cybersecurity systems, data analytics, and full-stack digital experiences."
  },
  {
    intents: ["praveen", "owner", "developer", "founder"],
    answer: "Praveen Kannan is a full-stack AI developer and software engineer focused on futuristic AI systems, automation platforms, premium dashboards, intelligent business solutions, and next-generation digital experiences."
  },
  {
    intents: ["services", "service", "offer", "build", "develop", "make"],
    answer: "ZILIST builds AI automation, AI chatbots, full-stack applications, AI dashboards, cybersecurity systems, analytics platforms, data science systems, and business automation workflows."
  },
  {
    intents: ["projects", "project", "portfolio", "case study", "work"],
    answer: "ZILIST project examples include AI Chatbot Platform, Analytics Dashboard, Gym Management System, AI Automation Platform, Cybersecurity Dashboard, and Portfolio System."
  },
  {
    intents: ["contact", "email", "phone", "call", "whatsapp", "linkedin", "github"],
    answer: `Contact Praveen directly at ${owner.email}, call ${owner.phone}, connect on LinkedIn at ${owner.linkedin}, visit GitHub at ${owner.github}, or open the portfolio at ${owner.portfolio}.`
  },
  {
    intents: ["price", "pricing", "cost", "budget", "quote"],
    answer: "ZILIST does not use public subscriptions or fixed pricing. Every project is scoped privately with Praveen after understanding goals, integrations, timeline, and AI complexity."
  },
  {
    intents: ["time", "timeline", "deadline", "duration"],
    answer: "Timeline depends on scope. A chatbot or focused dashboard can be planned quickly, while a full-stack AI platform needs discovery, UI, backend, database, testing, and deployment phases."
  },
  {
    intents: ["chatbot", "assistant", "bot"],
    answer: "ZILIST can build custom AI chatbots with website knowledge, lead capture, multilingual support, admin review, OpenAI or Gemini integration, and safe fallback answers."
  },
  {
    intents: ["automation", "workflow", "automate"],
    answer: "ZILIST automation systems can connect forms, CRMs, dashboards, APIs, notifications, reports, and AI decisions so repetitive work runs with less manual effort."
  },
  {
    intents: ["dashboard", "analytics", "data", "report"],
    answer: "ZILIST creates premium AI dashboards for business metrics, analytics, operations, cybersecurity visibility, customer insights, and executive decision-making."
  },
  {
    intents: ["security", "cybersecurity", "secure"],
    answer: "ZILIST can design cybersecurity dashboards and secure application layers with admin authentication, protected APIs, careful data handling, and monitoring workflows."
  }
];

function localKnowledgeAnswer(message) {
  const text = String(message || "").toLowerCase().replace(/[^\w\s+@.-]/g, " ");
  if (/\b(can|could|will|do)\b.*\b(build|create|make|develop|design|automate|integrate)\b/.test(text)) {
    return "Yes. ZILIST can build custom AI systems, chatbots, automations, dashboards, cybersecurity tools, data products, and full-stack applications. Share your idea through the contact form or email Praveen directly so the project can be scoped.";
  }
  const match = entries.find((entry) => entry.intents.some((intent) => text.includes(intent)));
  if (match) return match.answer;
  if (text.includes("?")) {
    return `That sounds like a custom ZILIST project question. Praveen can help clarify the best AI architecture, automation flow, database, dashboard, or deployment plan. Send details to ${owner.email}.`;
  }
  return "I can help with ZILIST services, custom project ideas, AI chatbots, automation, dashboards, cybersecurity, technology stack, pricing approach, timelines, portfolio, contact details, and navigation.";
}

module.exports = { entries, localKnowledgeAnswer };
