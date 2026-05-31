const projectImages = {
  "ai-chatbot-platform":     "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  "analytics-dashboard":     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  "gym-management-system":   "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  "ai-automation-platform":  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
  "cybersecurity-dashboard": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
  "portfolio-system":        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
};

// 3 screenshot images per project shown in the screen-row
const projectScreens = {
  "ai-chatbot-platform": [
    "https://images.unsplash.com/photo-1676299081847-824916de030a?w=700&q=80",
    "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=700&q=80",
    "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=700&q=80",
  ],
  "analytics-dashboard": [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80",
  ],
  "gym-management-system": [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80",
  ],
  "ai-automation-platform": [
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&q=80",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=700&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
  ],
  "cybersecurity-dashboard": [
    "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=700&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&q=80",
    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=700&q=80",
  ],
  "portfolio-system": [
    "https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&q=80",
    "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=700&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80",
  ],
};
const defaultScreens = [
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=700&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=80",
];

const projectDetails = {
  "ai-chatbot-platform": {
    title: "AI Chatbot Platform",
    category: "AI Solution",
    summary: "An intelligent AI chatbot platform built for businesses that need customer support, onboarding, internal knowledge, and automated lead qualification.",
    features: ["AI-powered conversations", "Knowledge base retrieval", "Multi-language support", "Lead capture workflows", "Admin response review"],
    tech: ["Node.js", "Express", "MongoDB", "OpenAI", "Gemini", "JWT", "Cloudinary"],
    results: ["Faster response time", "Consistent support quality", "Reusable AI knowledge system"],
    challenges: ["Designing safe fallback answers", "Keeping admin controls simple", "Balancing automation and human handoff"]
  },
  "analytics-dashboard": {
    title: "Analytics Dashboard",
    category: "Dashboard",
    summary: "Executive metrics and business intelligence platform delivering realtime reporting, KPI tracking, and deep operational insights for data-driven decisions.",
    features: ["Realtime KPI tracking", "Custom report builder", "Interactive chart library", "Role-based access controls", "Data export and scheduling"],
    tech: ["React", "D3.js", "Node.js", "PostgreSQL", "Redis", "Chart.js", "WebSockets"],
    results: ["Reduced reporting time by 70%", "Single source of truth for all teams", "Live dashboards updated every 30 seconds"],
    challenges: ["Handling large dataset rendering efficiently", "Designing intuitive drill-down UX", "Real-time sync without overloading the server"]
  },
  "gym-management-system": {
    title: "Gym Management System",
    category: "Full Application",
    summary: "A complete gym operations platform covering member management, subscription plans, attendance tracking, payments, and staff workflows.",
    features: ["Member registration and profiles", "Subscription plan management", "Attendance and check-in system", "Online payment integration", "Staff scheduling and roles"],
    tech: ["Node.js", "Express", "MongoDB", "Razorpay", "JWT", "Cloudinary", "Twilio"],
    results: ["Eliminated manual attendance tracking", "30% faster payment collection", "Reduced admin workload by half"],
    challenges: ["Complex plan expiry and renewal logic", "Handling concurrent check-ins", "SMS notification reliability across regions"]
  },
  "ai-automation-platform": {
    title: "AI Automation Platform",
    category: "Automation",
    summary: "Business workflow automation platform that removes manual tasks, connects APIs, and uses AI to trigger actions based on conditions and events.",
    features: ["Visual workflow builder", "AI-triggered automations", "Multi-service API integrations", "Conditional logic and branching", "Execution logs and monitoring"],
    tech: ["Node.js", "Python", "OpenAI", "Zapier SDK", "Redis", "MongoDB", "REST APIs"],
    results: ["Eliminated 80% of manual data entry", "Workflows execute in under 2 seconds", "Integrated with 12+ third-party services"],
    challenges: ["Handling API rate limits gracefully", "Building a no-code workflow UI", "Error recovery in multi-step automations"]
  },
  "cybersecurity-dashboard": {
    title: "Cybersecurity Dashboard",
    category: "Security",
    summary: "Threat visibility and incident management platform providing security teams with real-time event monitoring, controls management, and triage workflows.",
    features: ["Real-time threat monitoring", "Incident triage and escalation", "Security event timeline", "Role-based access controls", "Alert configuration and rules"],
    tech: ["React", "Node.js", "Elasticsearch", "MongoDB", "JWT", "WebSockets", "Docker"],
    results: ["Reduced mean time to detect (MTTD) by 60%", "Centralized alerts from 8 data sources", "Automated triage for 40% of incidents"],
    challenges: ["Processing high-volume event streams", "Minimising false positive fatigue", "Designing clear threat severity UI"]
  },
  "portfolio-system": {
    title: "Portfolio System",
    category: "Web Development",
    summary: "A premium personal brand ecosystem — the very site you are viewing — connecting projects, resources, client contact, and a live AI assistant.",
    features: ["Dynamic project showcase", "Resource and blog system", "AI chatbot integration", "Admin CMS dashboard", "Contact and payment flows"],
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB", "OpenAI", "Cloudinary"],
    results: ["Fully self-managed with no external CMS", "Sub-second page loads", "Integrated AI assistant handling enquiries 24/7"],
    challenges: ["Building a CMS without a framework", "Keeping the visual language consistent", "Balancing animation performance with accessibility"]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const slug = new URLSearchParams(window.location.search).get("slug") || "ai-chatbot-platform";
  const detail = projectDetails[slug] || projectDetails["ai-chatbot-platform"];

  // Hero image
  const heroImg = document.querySelector("[data-project-image]");
  if (heroImg) {
    heroImg.src = projectImages[slug] || projectImages["ai-chatbot-platform"];
    heroImg.alt = detail.title;
  }

  // Screenshot row images
  const screens = projectScreens[slug] || defaultScreens;
  document.querySelectorAll("[data-project-screen]").forEach((img) => {
    const idx = parseInt(img.dataset.projectScreen);
    img.src = screens[idx] || defaultScreens[idx] || defaultScreens[0];
    img.alt = detail.title + " screenshot " + (idx + 1);
  });

  document.querySelectorAll("[data-project-title]").forEach((node) => { node.textContent = detail.title; });
  document.querySelector("[data-project-summary]").textContent = detail.summary;
  document.querySelector("[data-project-category]").textContent = detail.category;
  document.querySelector("[data-project-features]").innerHTML = detail.features.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("[data-project-tech]").innerHTML = detail.tech.map((item) => `<span class="tag">${item}</span>`).join("");
  document.querySelector("[data-project-results]").innerHTML = detail.results.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("[data-project-challenges]").innerHTML = detail.challenges.map((item) => `<li>${item}</li>`).join("");
});
