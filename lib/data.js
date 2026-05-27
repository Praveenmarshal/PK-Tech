// In-memory store (production would use a real DB)
export const ADMIN_CREDENTIALS = {
  email: 'praveenkicha01@gmail.com',
  password: 'zilist2024'
};

export const projects = [
  {
    id: 'chatbot',
    name: 'AI Chatbot Platform',
    category: 'AI Solutions',
    emoji: '🤖',
    gradient: 'linear-gradient(135deg,#ede9fe,#c4b5fd)',
    desc: 'An intelligent AI chatbot platform built for businesses to enhance customer support and engagement with 24/7 automated responses.',
    longDesc: 'A sophisticated AI-powered chatbot platform that leverages GPT-4 to deliver human-like conversations. The platform supports multi-lingual responses, context-aware dialogues, and seamless CRM integrations.',
    features: ['AI-powered conversations','Multi-language support','Real-time analytics','Seamless Integration','Easy customization'],
    techs: ['Next.js','Node.js','MongoDB','OpenAI','Tailwind CSS','Socket.io'],
    result: '40%',
    resultLabel: 'Increase in customer satisfaction',
    tag: 'AI Solutions'
  },
  {
    id: 'analytics',
    name: 'Analytics Dashboard',
    category: 'Dashboards',
    emoji: '📊',
    gradient: 'linear-gradient(135deg,#dbeafe,#bfdbfe)',
    desc: 'A real-time analytics platform that transforms complex business data into beautiful visual insights and actionable reports.',
    longDesc: 'Enterprise-grade analytics platform with real-time data streaming, custom KPI tracking, and predictive analytics powered by machine learning models.',
    features: ['Real-time data streaming','Custom KPI tracking','Predictive analytics','Multi-source integration','Export & reporting'],
    techs: ['React','D3.js','Node.js','PostgreSQL','Redis','AWS'],
    result: '3x',
    resultLabel: 'Faster decision making',
    tag: 'Dashboards'
  },
  {
    id: 'gym',
    name: 'Gym Management System',
    category: 'Web Application',
    emoji: '🏋️',
    gradient: 'linear-gradient(135deg,#d1fae5,#a7f3d0)',
    desc: 'A comprehensive gym management platform with member tracking, billing, and attendance automation.',
    longDesc: 'Full-stack gym management system with member onboarding, automated billing cycles, attendance tracking via QR codes, and trainer management.',
    features: ['Member management','Automated billing','QR code attendance','Trainer scheduling','Revenue analytics'],
    techs: ['Next.js','Express','MongoDB','Stripe','Tailwind CSS','Next Auth'],
    result: '85%',
    resultLabel: 'Reduction in admin workload',
    tag: 'Web Application'
  },
  {
    id: 'automation',
    name: 'AI Automation Platform',
    category: 'Automation',
    emoji: '⚡',
    gradient: 'linear-gradient(135deg,#fef3c7,#fde68a)',
    desc: 'A powerful workflow automation platform that eliminates repetitive tasks using intelligent AI agents.',
    longDesc: 'No-code automation builder with drag-and-drop workflow design, 200+ integrations, and AI-powered decision nodes that adapt to changing business conditions.',
    features: ['Drag-and-drop builder','200+ integrations','AI decision nodes','Error handling','Audit logs'],
    techs: ['React','Python','FastAPI','Celery','Redis','Docker'],
    result: '70%',
    resultLabel: 'Time saved on manual tasks',
    tag: 'Automation'
  },
  {
    id: 'cyber',
    name: 'Cybersecurity Dashboard',
    category: 'Security',
    emoji: '🛡️',
    gradient: 'linear-gradient(135deg,#fce7f3,#fbcfe8)',
    desc: 'An AI-driven security monitoring platform with threat detection and real-time alerting systems.',
    longDesc: 'Advanced cybersecurity operations center with AI-powered threat intelligence, anomaly detection, and automated incident response workflows.',
    features: ['AI threat detection','Real-time monitoring','Incident response','Compliance reporting','Network visualization'],
    techs: ['React','Python','Elasticsearch','Kibana','TensorFlow','AWS'],
    result: '99.9%',
    resultLabel: 'Threat detection rate',
    tag: 'Security'
  },
  {
    id: 'portfolio',
    name: 'Portfolio System',
    category: 'Web Development',
    emoji: '🌐',
    gradient: 'linear-gradient(135deg,#ffe4e6,#fecdd3)',
    desc: 'A premium full-stack portfolio platform with CMS, analytics, and AI-generated content features.',
    longDesc: 'Next.js portfolio system with headless CMS, built-in SEO optimization, AI content suggestions, and a stunning admin dashboard for content management.',
    features: ['Headless CMS','AI content assist','SEO optimization','Analytics built-in','Custom domains'],
    techs: ['Next.js','Sanity CMS','OpenAI','Vercel','Tailwind CSS','Analytics'],
    result: '10x',
    resultLabel: 'More leads generated',
    tag: 'Web Development'
  }
];

export const resources = [
  {
    id: 'future-ai',
    title: 'The Future of AI Automation',
    category: 'AI Automation',
    emoji: '🤖',
    gradient: 'linear-gradient(135deg,#ede9fe,#c4b5fd)',
    date: 'May 12, 2024',
    readTime: '8 min read',
    excerpt: 'AI automation is transforming the way businesses operate. From workflow automation to intelligent decision making, it is shaping the future of industries worldwide.',
    content: [
      'AI automation is transforming how businesses operate across every industry. From manufacturing floors to marketing departments, intelligent systems are taking over repetitive tasks and enabling humans to focus on creative, strategic work.',
      'The rise of large language models has opened new possibilities for automating complex knowledge work. Tasks that previously required specialized expertise can now be handled by AI systems trained on vast datasets.',
      'As we look ahead, the convergence of AI, robotics, and IoT will create unprecedented opportunities for businesses willing to invest in intelligent automation infrastructure.'
    ]
  },
  {
    id: 'building-chatbots',
    title: 'Building Smarter AI Chatbots',
    category: 'AI Solutions',
    emoji: '💬',
    gradient: 'linear-gradient(135deg,#dbeafe,#bfdbfe)',
    date: 'May 5, 2024',
    readTime: '6 min read',
    excerpt: 'Learn how to build context-aware chatbots that truly understand your customers and deliver exceptional support experiences at scale.',
    content: [
      'Building a truly intelligent chatbot goes far beyond simple keyword matching. Modern AI chatbots leverage transformer-based models to understand context, intent, and sentiment.',
      'The key to a successful chatbot implementation is training it on your specific domain data. Generic models need fine-tuning to handle industry-specific terminology and use cases effectively.',
      'Integration with your CRM and support systems transforms a chatbot from a standalone tool into a powerful customer success platform that learns and improves over time.'
    ]
  },
  {
    id: 'ai-business',
    title: 'AI in Business: A Complete Guide',
    category: 'Business',
    emoji: '🏢',
    gradient: 'linear-gradient(135deg,#d1fae5,#a7f3d0)',
    date: 'May 1, 2024',
    readTime: '10 min read',
    excerpt: 'A comprehensive guide to integrating AI into your business strategy, from identifying opportunities to measuring ROI and choosing the right technology partners.',
    content: [
      'Integrating AI into your business does not have to be complicated. The most successful AI adoptions start with clear problem identification and measurable goals rather than technology-first thinking.',
      'From identifying automation opportunities to measuring ROI, the key is starting with clear objectives. Start with processes that are high-volume, rule-based, and time-consuming as your first AI automation targets.',
      'Choosing the right technology partner is crucial. Look for teams that combine deep AI expertise with business domain knowledge and a track record of successful enterprise deployments.'
    ]
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering Guide',
    category: 'AI Solutions',
    emoji: '⚡',
    gradient: 'linear-gradient(135deg,#fef3c7,#fde68a)',
    date: 'Apr 20, 2024',
    readTime: '7 min read',
    excerpt: 'Master the art of prompt engineering to get consistently better outputs from AI models for your specific use cases.',
    content: [
      'Prompt engineering is the art of crafting inputs to AI models that consistently produce high-quality, relevant outputs. It is both a science and an art that requires practice and iteration.',
      'The most effective prompts are specific, provide context, include examples of desired outputs, and clearly state constraints. Vague prompts produce vague results.',
      'As AI models evolve, prompt engineering skills will become a fundamental literacy for knowledge workers across all industries.'
    ]
  },
  {
    id: 'ai-developers',
    title: 'AI Tools for Developers',
    category: 'Development',
    emoji: '🔧',
    gradient: 'linear-gradient(135deg,#fce7f3,#fbcfe8)',
    date: 'Apr 15, 2024',
    readTime: '5 min read',
    excerpt: 'Explore the top AI development tools that are supercharging developer productivity and enabling faster, better software development.',
    content: [
      'The AI tooling ecosystem for developers has exploded in the past two years. From code completion to automated testing, AI is embedded throughout the modern development workflow.',
      'GitHub Copilot, Claude, and similar tools are not replacing developers but amplifying their capabilities. Teams using AI coding assistants report 30-50% productivity improvements on routine tasks.',
      'The most impactful AI developer tools are those that integrate seamlessly into existing workflows rather than requiring developers to change how they work.'
    ]
  },
  {
    id: 'ai-industries',
    title: 'How AI is Changing Industries',
    category: 'Business',
    emoji: '🌐',
    gradient: 'linear-gradient(135deg,#ffe4e6,#fecdd3)',
    date: 'Apr 10, 2024',
    readTime: '9 min read',
    excerpt: 'From healthcare to finance, AI is revolutionizing every industry. Explore the transformative impact and what it means for your sector.',
    content: [
      'Every industry is being reshaped by AI, but the pace and nature of transformation varies significantly. Healthcare, finance, and manufacturing are seeing the most dramatic changes.',
      'In healthcare, AI diagnostic tools are achieving accuracy rates that match or exceed human specialists in narrow domains. In finance, algorithmic trading and fraud detection have been AI-driven for years.',
      'The industries most resistant to AI disruption are those requiring deep human relationships, creative judgment, and adaptability to novel situations. But even these are being augmented by AI tools.'
    ]
  }
];

// In-memory message store
let messages = [
  { id: 1, name: 'Rahul Verma', email: 'rahul@example.com', subject: 'AI Chatbot Project', message: 'Looking to build a chatbot', date: '2024-05-15', status: 'unread' },
  { id: 2, name: 'Neha Sharma', email: 'neha@example.com', subject: 'Dashboard Development', message: 'Need analytics dashboard', date: '2024-05-14', status: 'read' },
  { id: 3, name: 'Arun Singh', email: 'arun@example.com', subject: 'Automation System', message: 'Workflow automation help', date: '2024-05-13', status: 'read' }
];
let messageIdCounter = 4;

export function getMessages() { return messages; }
export function addMessage(msg) {
  const newMsg = { ...msg, id: messageIdCounter++, date: new Date().toISOString().split('T')[0], status: 'unread' };
  messages.unshift(newMsg);
  return newMsg;
}
export function updateMessageStatus(id, status) {
  const msg = messages.find(m => m.id === parseInt(id));
  if (msg) msg.status = status;
  return msg;
}
