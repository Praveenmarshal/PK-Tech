import Layout from '../components/Layout';
import Link from 'next/link';

const solutions = [
  { icon: '🧬', name: 'AI & Machine Learning', desc: 'Fine-tune models and deploy scalable AI pipelines for your specific business context and data sets.', tag: 'AI Solutions' },
  { icon: '💻', name: 'Web Development', desc: 'Fast, secure & scalable Next.js and React applications with premium UI and production-ready backends.', tag: 'Web Dev' },
  { icon: '📈', name: 'Data Analytics', desc: 'Transform raw data into actionable insights with custom analytics platforms and visualization systems.', tag: 'Analytics' },
  { icon: '⚙️', name: 'Automation Systems', desc: 'End-to-end workflow automation that eliminates manual processes and accelerates business growth.', tag: 'Automation' },
  { icon: '🔬', name: 'Data Science', desc: 'Advanced data analysis and predictive modeling for smarter, data-driven business decisions.', tag: 'Data Science' },
  { icon: '🛡️', name: 'Cybersecurity', desc: 'Protect your digital infrastructure with AI-driven threat detection and enterprise security systems.', tag: 'Security' },
  { icon: '📊', name: 'AI Dashboards', desc: 'Beautiful real-time dashboards and reporting tools that make complex data easy to understand.', tag: 'Dashboards' },
  { icon: '🏢', name: 'AI Business Solutions', desc: 'Custom AI systems built for your business — from CRM to ERP to intelligent decision engines.', tag: 'Enterprise AI' },
];

export default function Solutions() {
  return (
    <Layout title="Solutions — ZILIST">
      <section style={{ paddingTop: '140px' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">Service Domains</div>
              <h2 className="section-title">AI Solutions for<br />Every Business Need</h2>
            </div>
            <p className="section-subtitle">We deliver custom AI solutions that help you innovate, automate, and grow faster.</p>
          </div>
          <div className="solutions-grid">
            {solutions.map(s => (
              <div key={s.name} className="glass-card solution-card">
                <div className="solution-icon-wrap">{s.icon}</div>
                <div>
                  <div className="solution-name">{s.name}</div>
                  <div className="solution-desc">{s.desc}</div>
                  <span className="solution-tag">{s.tag}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link href="/contact" className="btn-primary">Discuss Your Solution →</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
