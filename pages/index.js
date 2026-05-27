import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout title="ZILIST — Build Smarter. Automate Everything.">
      {/* HERO */}
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 48px 80px', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Left */}
          <div>
            <div className="hero-eyebrow fade-up">Next-Gen AI Platform</div>
            <h1 className="fade-up delay-1">
              Build Smarter.<br />
              Automate <em>Everything.</em><br />
              With ZILIST AI.
            </h1>
            <p className="hero-desc fade-up delay-2">
              ZILIST builds intelligent AI systems, automated solutions, and digital platforms that help businesses grow, scale and lead in the future.
            </p>
            <div className="hero-buttons fade-up delay-3">
              <Link href="/contact" className="btn-primary">Contact Me ↗</Link>
              <Link href="/projects" className="btn-secondary">Start Your Project →</Link>
              <Link href="/projects" className="btn-secondary">View Portfolio</Link>
            </div>
            <div className="trusted-bar fade-up delay-4">
              <span className="trusted-label">Trusted by innovators worldwide</span>
              <div className="trusted-logos">
                {['Google','Microsoft','OpenAI','AWS','Notion'].map(l => (
                  <span key={l} className="trusted-logo">{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="hero-visual" style={{ position: 'relative', height: '520px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="hero-3d-scene" style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(196,181,253,0.18) 0%, transparent 70%)',
              borderRadius: '32px', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {/* Central brain orb */}
              <div style={{
                width: '200px', height: '200px', borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #c4b5fd, #8b5cf6, #4c1d95)',
                boxShadow: '0 0 60px rgba(139,92,246,0.5), 0 0 120px rgba(139,92,246,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '5rem', position: 'relative', zIndex: 2,
                animation: 'orb-float 4s ease-in-out infinite'
              }}>
                🧠
              </div>
              {/* Rings */}
              {[280, 360, 440].map((size, i) => (
                <div key={size} style={{
                  position: 'absolute', width: `${size}px`, height: `${size}px`,
                  border: `1px solid rgba(139,92,246,${0.2 - i * 0.05})`,
                  borderRadius: '50%',
                  animation: `spin-slow ${20 + i * 10}s linear infinite ${i % 2 ? 'reverse' : ''}`
                }} />
              ))}
            </div>

            {/* Float cards */}
            <div className="glass-card" style={{ position: 'absolute', top: '60px', left: '-20px', padding: '16px 20px', minWidth: '160px', zIndex: 3 }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>🤖</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI Systems</div>
              <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--deep)' }}>500+ Built</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--violet)' }}>Active Projects</div>
            </div>
            <div className="glass-card" style={{ position: 'absolute', bottom: '80px', right: '-20px', padding: '16px 20px', minWidth: '160px', zIndex: 3 }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>📊</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Analytics</div>
              <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--deep)' }}>Real-time</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--violet)' }}>Data Insights</div>
            </div>
            <div className="glass-card" style={{ position: 'absolute', top: '50%', right: '-30px', transform: 'translateY(-50%)', padding: '16px 20px', minWidth: '150px', zIndex: 3 }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>⚡</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Automation</div>
              <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--deep)' }}>10x Faster</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--violet)' }}>Workflows</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span className="scroll-text">Scroll</span>
        </div>
      </div>

      {/* FEATURES PREVIEW */}
      <section>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">What We Build</div>
              <h2 className="section-title">Powerful AI Solutions<br />for Modern Businesses</h2>
            </div>
            <p className="section-subtitle">Everything you need to build, automate, and scale with AI technology that works for your business.</p>
          </div>
          <div className="features-grid">
            {[
              { icon: '🤖', name: 'AI Automation', desc: 'Automate repetitive tasks and workflows with intelligent AI agents powered by GPT-4o and Gemini.' },
              { icon: '📊', name: 'Smart Analytics', desc: 'Real-time insights with advanced analytics, predictive modeling, and custom reporting dashboards.' },
              { icon: '💬', name: 'AI Chatbots', desc: 'Intelligent chatbots that engage and convert visitors with context-aware conversations.' },
              { icon: '✍️', name: 'Content Generation', desc: 'AI-powered content for blogs, ads, and more — tailored to your brand voice.' },
              { icon: '🔗', name: 'API Integrations', desc: 'Seamlessly connect with your favorite tools and platforms through smart APIs.' },
              { icon: '🔒', name: 'Security Systems', desc: 'Enterprise-grade security for your ideas, data, and digital infrastructure.' },
              { icon: '🏗️', name: 'Scalable Platforms', desc: 'Built to scale with your ideas — from MVP to enterprise-grade infrastructure.' },
              { icon: '🌐', name: '24/7 Support', desc: 'We\'re here to support you anytime, anywhere with dedicated care.' },
            ].map(f => (
              <div key={f.name} className="glass-card feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-name">{f.name}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/features" className="btn-primary">Explore All Features →</Link>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ padding: '80px 48px' }}>
        <div className="container">
          <div className="glass-card" style={{
            padding: '64px', borderRadius: '32px',
            background: 'linear-gradient(135deg,rgba(139,92,246,0.1),rgba(196,181,253,0.05))',
            textAlign: 'center'
          }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Ready to Start?</div>
            <h2 className="section-title" style={{ marginBottom: '20px' }}>Let's Build Something<br />Extraordinary Together</h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
              Join 500+ businesses using ZILIST's AI solutions to automate, grow, and lead their industries.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">Start Your Project →</Link>
              <Link href="/about" className="btn-secondary">Learn About ZILIST</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
