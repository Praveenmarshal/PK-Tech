import Layout from '../components/Layout';
import Link from 'next/link';

export default function About() {
  return (
    <Layout title="About — ZILIST">
      <section style={{ paddingTop: '140px' }}>
        <div className="container">
          <div className="about-grid">
            {/* Left */}
            <div>
              <div className="section-eyebrow">About ZILIST</div>
              <h2 className="section-title">A Digital Innovation<br />Company Driven by<br />Intelligence</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300, marginBottom: '24px' }}>
                ZILIST is a digital innovation company driven by creativity, intelligence, and a passion for building futuristic AI solutions for businesses worldwide.
              </p>

              <div className="stats-grid">
                {[
                  { num: '500', unit: '+', label: 'Clients' },
                  { num: '350', unit: '+', label: 'Projects' },
                  { num: '5', unit: '+', label: 'Years Experience' },
                  { num: '20', unit: '+', label: 'Countries' },
                  { num: 'AI', unit: '', label: 'Driven' },
                  { num: '24', unit: '/7', label: 'Support' },
                ].map(s => (
                  <div key={s.label} className="glass-card stat-item">
                    <div className="stat-num">{s.num}<span>{s.unit}</span></div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '32px' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', color: 'var(--deep)', marginBottom: '8px' }}>Meet Praveen Kannan</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300, marginBottom: '24px' }}>
                  Praveen Kannan is a full-stack AI developer and software engineer focused on building futuristic AI systems, automation platforms, premium dashboards, intelligent business solutions, and next-generation digital experiences.
                </p>
                <div className="about-links">
                  <a href="https://praveen-kannan-4607.vercel.app/" target="_blank" rel="noopener" className="about-link primary">View Portfolio</a>
                  <a href="https://github.com/Praveenmarshal" target="_blank" rel="noopener" className="about-link">GitHub Profile</a>
                  <a href="https://www.linkedin.com/in/praveen-kannan-6862382a2" target="_blank" rel="noopener" className="about-link">LinkedIn Profile</a>
                  <Link href="/contact" className="about-link">Contact Me</Link>
                </div>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="about-visual">
              <div className="about-ring about-ring-1"></div>
              <div className="about-ring about-ring-2"></div>
              <div className="about-avatar">👨‍💻</div>
            </div>
          </div>

          {/* Mission Vision Values */}
          <div className="mvv-grid">
            {[
              { icon: '🎯', title: 'Our Mission', text: 'Empower businesses with brilliant AI solutions and intelligent automation.' },
              { icon: '🔭', title: 'Our Vision', text: 'To become a global leader in AI innovation and digital transformation.' },
              { icon: '💎', title: 'Our Values', text: 'Innovation, transparency, quality, and client success drive everything we do.' },
            ].map(m => (
              <div key={m.title} className="glass-card mvv-card">
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{m.icon}</div>
                <div className="mvv-title">{m.title}</div>
                <div className="mvv-text">{m.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
