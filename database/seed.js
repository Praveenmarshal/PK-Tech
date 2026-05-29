require("dotenv").config({ path: require("path").join(__dirname, "../backend/.env") });

const mongoose = require("mongoose");
const connectDB = require("../backend/config/db");
const { seedAdmin } = require("../backend/utils/seedAdmin");
const Project = require("../backend/models/Project");
const Resource = require("../backend/models/Resource");
const Testimonial = require("../backend/models/Testimonial");

const projects = [
  {
    title: "AI Chatbot Platform",
    slug: "ai-chatbot-platform",
    category: "AI Solution",
    summary: "Multilingual assistant with knowledge retrieval, admin controls, and analytics.",
    featured: true,
    technologies: ["Node.js", "MongoDB", "OpenAI", "Gemini", "JWT"]
  },
  {
    title: "Analytics Dashboard",
    slug: "analytics-dashboard",
    category: "Dashboard",
    summary: "Executive metrics, business intelligence, realtime reporting, and insights.",
    featured: true,
    technologies: ["Express", "MongoDB", "Charting", "Analytics"]
  },
  {
    title: "Gym Management System",
    slug: "gym-management-system",
    category: "Web Development",
    summary: "Member operations, plans, attendance, payments, and staff workflows.",
    technologies: ["Node.js", "MongoDB", "Admin Panel"]
  },
  {
    title: "AI Automation Platform",
    slug: "ai-automation-platform",
    category: "Automation",
    summary: "Business workflows that remove manual tasks and connect APIs.",
    technologies: ["Automation", "APIs", "AI Agents"]
  },
  {
    title: "Cybersecurity Dashboard",
    slug: "cybersecurity-dashboard",
    category: "Security",
    summary: "Threat visibility, events, controls, and incident triage experiences.",
    technologies: ["Security", "Dashboards", "Alerts"]
  },
  {
    title: "Portfolio System",
    slug: "portfolio-system",
    category: "Web Development",
    summary: "Premium personal brand ecosystem connected to projects and content.",
    technologies: ["HTML", "CSS", "JavaScript", "Vercel"]
  }
];

const resources = [
  { title: "The Future of AI Automation", slug: "future-of-ai-automation", category: "AI Automation", excerpt: "How AI automation transforms modern business operations." },
  { title: "Building Smarter AI Chatbots", slug: "building-smarter-ai-chatbots", category: "Tutorial", excerpt: "How to design useful chatbot systems with knowledge and guardrails." },
  { title: "AI in Business: A Complete Guide", slug: "ai-business-guide", category: "Guide", excerpt: "A practical guide to AI use cases for business workflows." },
  { title: "Prompt Engineering Guide", slug: "prompt-engineering-guide", category: "Prompt Guides", excerpt: "Patterns for better prompts, safer answers, and reliable AI tools." },
  { title: "AI Tools for Developers", slug: "ai-tools-for-developers", category: "AI Tools", excerpt: "A curated view of tools for building modern AI applications." },
  { title: "How AI is Changing Industries", slug: "ai-changing-industries", category: "Articles", excerpt: "A calm look at AI adoption across sectors." }
];

async function seed() {
  await connectDB();
  await seedAdmin();
  await Project.deleteMany({});
  await Resource.deleteMany({});
  await Testimonial.deleteMany({});
  await Project.insertMany(projects);
  await Resource.insertMany(resources);
  await Testimonial.insertMany([
    { name: "Rohan Verma", role: "Founder", quote: "ZILIST turned our AI idea into a clean, premium platform with real workflow value." },
    { name: "Nila Shah", role: "Operations Lead", quote: "The dashboard made our business data feel calm, readable, and immediately useful." }
  ]);
  console.log("ZILIST seed data inserted.");
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

