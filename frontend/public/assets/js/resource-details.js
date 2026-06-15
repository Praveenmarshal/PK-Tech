const resourceData = {
  "future-of-ai-automation": {
    title: "The Future of AI Automation",
    eyebrow: "AI Automation",
    hero: "AI automation is transforming business operations from repetitive workflows to intelligent decision-making.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80",
    toc: ["The Rise of AI Automation", "Key Benefits", "Core Technologies", "Real World Applications", "What Comes Next"],
    sections: [
      { heading: "1. The Rise of AI Automation", body: "Automation has evolved far beyond simple scripts. Today's AI systems understand context, trigger complex multi-step workflows, summarise data, and support teams across every business function — from customer support to finance and operations." },
      { heading: "2. Key Benefits", body: "Businesses that deploy AI automation consistently report faster turnaround times, reduced error rates, lower operational costs, and better visibility into signals that matter. Teams spend less time on repetitive tasks and more time on decisions that require human judgement." },
      { heading: "3. Core Technologies", body: "The strongest automation systems combine large language models, retrieval-augmented generation, REST APIs, event queues, secure databases, and human-in-the-loop review paths. Each layer serves a specific purpose in keeping the system reliable and auditable." },
      { heading: "4. Real World Applications", body: "PK Tech applies AI automation to intelligent chatbots, lead qualification pipelines, executive dashboards, internal knowledge tools, cybersecurity visibility, data analytics platforms, and end-to-end business process automation across industries." },
      { heading: "5. What Comes Next", body: "The next generation of digital businesses will operate like intelligent ecosystems — calm, minimal interfaces backed by powerful automated decisions, secure data pipelines, and adaptive workflows that improve with every interaction." }
    ],
    related: [
      { slug: "building-smarter-ai-chatbots", title: "Building Smarter AI Chatbots" },
      { slug: "ai-tools-for-developers", title: "AI Tools for Developers" },
      { slug: "prompt-engineering-guide", title: "Prompt Engineering Guide" }
    ]
  },
  "building-smarter-ai-chatbots": {
    title: "Building Smarter AI Chatbots",
    eyebrow: "Tutorial",
    hero: "Learn the architecture, patterns, and engineering decisions behind chatbots that actually work in production.",
    image: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=900&q=80",
    toc: ["Why Most Chatbots Fail", "Retrieval-Augmented Generation", "Conversation Design", "Admin Controls", "Deploying to Production"],
    sections: [
      { heading: "1. Why Most Chatbots Fail", body: "Most chatbots fail because they hallucinate answers, go off-topic, or have no fallback when they reach the edge of their knowledge. A production chatbot needs retrieval, constraints, and human handoff paths built in from the start." },
      { heading: "2. Retrieval-Augmented Generation", body: "RAG connects your language model to a real knowledge base — documents, FAQs, product data — so the model answers from your content, not from general training. This dramatically reduces hallucinations and keeps responses accurate and on-brand." },
      { heading: "3. Conversation Design", body: "Good chatbot UX feels calm and direct. Avoid menus when free text works better. Keep responses concise. Use typing indicators and graceful error messages. Design for mobile first since most users interact on phones." },
      { heading: "4. Admin Controls", body: "A production chatbot needs an admin dashboard where you can review conversations, approve or correct responses, update the knowledge base, and see analytics on what users are asking. Without oversight, quality degrades quickly." },
      { heading: "5. Deploying to Production", body: "Deploy behind rate limiting, authentication, and logging from day one. Monitor token usage, latency, and error rates. Use environment variables for all API keys. Set up alerts for unusual patterns. Plan for zero-downtime updates from the start." }
    ],
    related: [
      { slug: "future-of-ai-automation", title: "The Future of AI Automation" },
      { slug: "prompt-engineering-guide", title: "Prompt Engineering Guide" },
      { slug: "ai-tools-for-developers", title: "AI Tools for Developers" }
    ]
  },
  "ai-business-guide": {
    title: "AI in Business: A Complete Guide",
    eyebrow: "Guide",
    hero: "A practical guide to adopting AI across your business — from first use cases to full-scale deployment.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80",
    toc: ["Where to Start", "Choosing Use Cases", "Build vs Buy", "Data and Privacy", "Measuring ROI"],
    sections: [
      { heading: "1. Where to Start", body: "The best starting point is a high-frequency, low-risk process — something your team does repeatedly and where a mistake is recoverable. Customer FAQ handling, data summarisation, and draft generation are proven entry points for most businesses." },
      { heading: "2. Choosing Use Cases", body: "Prioritise use cases where AI can save measurable time or reduce a specific cost. Document the current process, estimate the hours spent, and project what 70–80% automation would mean in savings. Start narrow, prove value, then expand." },
      { heading: "3. Build vs Buy", body: "Off-the-shelf AI tools are fast to deploy but hard to customise. Custom-built systems take longer but fit your workflows exactly, own your data, and compound in value over time. Most businesses benefit from a hybrid: standard tools for simple tasks, custom for core processes." },
      { heading: "4. Data and Privacy", body: "AI systems are only as good as the data they access. Before deploying, audit what data your AI will touch, who can see it, and how it is stored. Ensure compliance with GDPR, DPDP, or applicable regulations. Never send sensitive personal data to third-party models without a data processing agreement." },
      { heading: "5. Measuring ROI", body: "Track time saved per task, error rate reduction, cost per outcome, and team satisfaction. Set a 90-day baseline before deployment, then measure monthly. ROI from AI compounds — early wins fund deeper integrations that multiply the returns." }
    ],
    related: [
      { slug: "future-of-ai-automation", title: "The Future of AI Automation" },
      { slug: "ai-changing-industries", title: "How AI is Changing Industries" },
      { slug: "ai-tools-for-developers", title: "AI Tools for Developers" }
    ]
  },
  "prompt-engineering-guide": {
    title: "Prompt Engineering Guide",
    eyebrow: "Prompt Guides",
    hero: "Master the art of writing prompts that get consistent, accurate, and useful results from language models.",
    image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=900&q=80",
    toc: ["What is Prompt Engineering", "Core Techniques", "System Prompts", "Chain of Thought", "Common Mistakes"],
    sections: [
      { heading: "1. What is Prompt Engineering", body: "Prompt engineering is the practice of designing inputs to language models in ways that reliably produce the outputs you want. It is part writing, part programming, and part psychology — understanding how models interpret instructions and where they go wrong." },
      { heading: "2. Core Techniques", body: "The most reliable techniques are: be explicit about the format you want, give examples of good and bad outputs, break complex tasks into steps, and tell the model what role it should play. Vague prompts produce vague results — specificity is everything." },
      { heading: "3. System Prompts", body: "System prompts set the model's behaviour, persona, and constraints before the user says anything. A well-written system prompt handles the majority of edge cases automatically: what to do when the user goes off-topic, what tone to use, what information is confidential, and what actions require escalation." },
      { heading: "4. Chain of Thought", body: "Chain-of-thought prompting asks the model to reason step by step before giving a final answer. This dramatically improves accuracy on complex tasks like analysis, math, and multi-step decisions. Add 'Think step by step' or structure the prompt to require reasoning before conclusions." },
      { heading: "5. Common Mistakes", body: "The most common mistakes are: prompts that are too vague, relying on the model to infer format when you should specify it, not testing edge cases, and treating the first working prompt as final. Prompt engineering is iterative — test, observe, refine, repeat." }
    ],
    related: [
      { slug: "building-smarter-ai-chatbots", title: "Building Smarter AI Chatbots" },
      { slug: "ai-tools-for-developers", title: "AI Tools for Developers" },
      { slug: "future-of-ai-automation", title: "The Future of AI Automation" }
    ]
  },
  "ai-tools-for-developers": {
    title: "AI Tools for Developers",
    eyebrow: "AI Tools",
    hero: "A curated breakdown of the AI tools, APIs, and frameworks every developer should know in 2026.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&q=80",
    toc: ["Language Model APIs", "Vector Databases", "Orchestration Frameworks", "Local Models", "Developer Tooling"],
    sections: [
      { heading: "1. Language Model APIs", body: "OpenAI, Anthropic Claude, and Google Gemini are the three production-grade APIs developers rely on. Each has different strengths: GPT-4o for multimodal tasks, Claude for long-context reasoning and safety, Gemini for Google ecosystem integrations. Most serious applications use at least two for redundancy." },
      { heading: "2. Vector Databases", body: "Pinecone, Weaviate, and pgvector (Postgres extension) are the leading options for storing and retrieving embeddings at scale. Vector databases power RAG systems, semantic search, recommendation engines, and memory systems for AI agents. Choose based on your existing infrastructure and scale requirements." },
      { heading: "3. Orchestration Frameworks", body: "LangChain and LlamaIndex provide high-level abstractions for chaining LLM calls, managing context windows, connecting to data sources, and building agents. They accelerate development but add abstraction layers — understand what they do before depending on them in production." },
      { heading: "4. Local Models", body: "Ollama makes running open-source models like Llama 3, Mistral, and Phi-3 locally trivially simple. Local models are ideal for privacy-sensitive tasks, cost control, and offline applications. Performance has narrowed significantly — for many tasks, local models are now production-viable." },
      { heading: "5. Developer Tooling", body: "Key tools every AI developer should have: LangSmith for tracing and debugging LLM chains, Weights & Biases for experiment tracking, Cursor or GitHub Copilot for AI-assisted coding, and Postman for API testing. Invest in observability from day one — debugging AI systems without traces is extremely difficult." }
    ],
    related: [
      { slug: "prompt-engineering-guide", title: "Prompt Engineering Guide" },
      { slug: "building-smarter-ai-chatbots", title: "Building Smarter AI Chatbots" },
      { slug: "ai-business-guide", title: "AI in Business: A Complete Guide" }
    ]
  },
  "ai-changing-industries": {
    title: "How AI is Changing Industries",
    eyebrow: "Articles",
    hero: "A deep look at how AI is reshaping healthcare, finance, logistics, education, and creative industries.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
    toc: ["Healthcare", "Finance", "Logistics", "Education", "Creative Industries"],
    sections: [
      { heading: "1. Healthcare", body: "AI is accelerating diagnostics, drug discovery, and patient monitoring. Radiology models now detect certain cancers earlier than human specialists in controlled studies. AI scribes reduce documentation burden by generating clinical notes from doctor-patient conversations in real time." },
      { heading: "2. Finance", body: "Banks and fintechs use AI for fraud detection, credit risk scoring, algorithmic trading, and personalised financial advice. AI models process thousands of signals in milliseconds to flag suspicious transactions, dramatically reducing fraud losses while cutting false positives that frustrate legitimate customers." },
      { heading: "3. Logistics", body: "Logistics companies use AI for route optimisation, demand forecasting, warehouse automation, and predictive maintenance. AI-powered routing reduces fuel costs and delivery times simultaneously. Predictive maintenance catches equipment failures before they cause costly downtime." },
      { heading: "4. Education", body: "AI tutors provide personalised learning paths, instant feedback, and adaptive difficulty. Teachers use AI to generate lesson plans, identify struggling students early, and handle administrative tasks. The best implementations augment teachers rather than replacing them, freeing time for the human connections that matter most." },
      { heading: "5. Creative Industries", body: "AI tools are reshaping how designers, writers, musicians, and filmmakers work. Rather than replacing creativity, the most effective use is accelerating ideation, handling repetitive production tasks, and enabling smaller teams to produce at scales previously requiring large studios." }
    ],
    related: [
      { slug: "ai-business-guide", title: "AI in Business: A Complete Guide" },
      { slug: "future-of-ai-automation", title: "The Future of AI Automation" },
      { slug: "building-smarter-ai-chatbots", title: "Building Smarter AI Chatbots" }
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const slug = new URLSearchParams(window.location.search).get("slug") || "future-of-ai-automation";
  const data = resourceData[slug] || resourceData["future-of-ai-automation"];

  // Title
  document.querySelectorAll("[data-resource-title]").forEach((el) => { el.textContent = data.title; });

  // Eyebrow
  const eyebrow = document.querySelector("[data-resource-eyebrow]");
  if (eyebrow) eyebrow.textContent = data.eyebrow;

  // Hero copy
  const heroCopy = document.querySelector("[data-resource-hero]");
  if (heroCopy) heroCopy.textContent = data.hero;

  // Hero image
  const heroImg = document.querySelector("[data-resource-image]");
  if (heroImg) { heroImg.src = data.image; heroImg.alt = data.title; }

  // Article sections
  const articleBody = document.querySelector("[data-resource-body]");
  if (articleBody) {
    articleBody.innerHTML = data.sections.map((s) =>
      `<h2>${s.heading}</h2><p class="body-copy">${s.body}</p>`
    ).join("");
  }

  // Table of contents
  const toc = document.querySelector("[data-resource-toc]");
  if (toc) {
    toc.innerHTML = data.toc.map((item) => `<li>${item}</li>`).join("");
  }

  // Related articles
  const related = document.querySelector("[data-resource-related]");
  if (related) {
    related.innerHTML = data.related.map((r) =>
      `<a href="resource-details.html?slug=${r.slug}">${r.title}</a>`
    ).join("");
  }

  // Breadcrumb
  const breadcrumb = document.querySelector("[data-resource-breadcrumb]");
  if (breadcrumb) breadcrumb.textContent = data.title;

  // Animate
  if (window.gsap) {
    gsap.from(".article-body h2, .article-body p", { y: 14, opacity: 0, stagger: 0.05, duration: 0.55 });
  }
});
