import Layout from '../components/Layout';
import Link from 'next/link';

const features = [
  { icon: '🤖', name: 'AI Automation', desc: 'Automate repetitive tasks and workflows with intelligent AI agents powered by GPT-4o and Gemini.' },
  { icon: '📊', name: 'Smart Analytics', desc: 'Real-time insights with advanced analytics, predictive modeling, and custom reporting dashboards.' },
  { icon: '💬', name: 'AI Chatbots', desc: 'Intelligent chatbots that engage and convert visitors with context-aware, multi-lingual conversations.' },
  { icon: '✍️', name: 'Content Generation', desc: 'AI-powered content for blogs, ads, emails, and social — tailored perfectly to your brand voice.' },
  { icon: '🔗', name: 'API Integrations', desc: 'Seamlessly connect with Stripe, Notion, Slack, Zapier, and 200+ platforms through clean APIs.' },
  { icon: '🔒', name: 'Security Systems', desc: 'Enterprise-grade security with JWT auth, encryption, threat monitoring, and compliance frameworks.' },
  { icon: '🏗️', name: 'Scalable Platforms', desc: 'Cloud-native architecture built to scale from startup MVP to enterprise-level traffic and data.' },
  { icon: '🌐', name: '24/7 Support', desc: 'Dedicated support with real-time communication, sprint reviews, and continuous improvement cycles.' },
  { icon: '⚡', name: 'Edge Performance', desc: 'Lightning-fast applications with CDN deployment, edge caching, and sub-100ms response times.' },
  { icon: '🧪', name: 'A/B Testing', desc: 'Built-in experimentation framework to continuously optimize user experience and conversion rates.' },
  { icon: '📱', name: 'Mobile-First', desc: 'Responsive, PWA-ready designs that work perfectly on every device and screen size.' },
  { icon: '🎨', name: 'Premium Design', desc: 'Apple-level aesthetics with cinematic animations, glassmorphism, and luxury UI systems.' },
];

export default function Features() {
  return (
    <Layout title="Features — ZILIST">
      <section style={{ paddingTop: '140px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Platform Capabilities</div>
            <h2 className="section-title">Powerful Features for<br />Modern Businesses</h2>
            <p className="section-subtitle" style={{ maxWidth: '100%' }}>Everything you need to build, automate, and scale with AI technology.</p>
          </div>
          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            {features.map(f => (
              <div key={f.name} className="glass-card feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-name">{f.name}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link href="/contact" className="btn-primary">Start Building with These Features →</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
