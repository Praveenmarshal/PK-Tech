import Layout from '../components/Layout';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Strands = dynamic(() => import('../components/Strands'), { ssr: false });

export default function About() {
  return (
    <Layout title="About — PK_Tech_Warrior">
      {/* Hero Banner with Strands */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: '120px', paddingBottom: '60px' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5 }}>
          <Strands
            colors={["#8B5CF6", "#7C3AED", "#06B6D4", "#F97316"]}
            count={5}
            speed={0.4}
            amplitude={1.2}
            waviness={1}
            thickness={0.6}
            glow={3}
            taper={3}
            spread={1.2}
            intensity={0.7}
            saturation={1.6}
            opacity={1}
            scale={1.5}
          />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="about-grid">
            {/* Left */}
            <div>
              <div className="section-eyebrow">About PK_Tech_Warrior</div>
              <h2 className="section-title">A Digital Innovation<br />Company Driven by<br />Intelligence</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300, marginBottom: '24px' }}>
                PK_Tech_Warrior is a digital innovation company driven by creativity, intelligence, and a passion for building futuristic AI solutions for businesses worldwide.
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

            {/* Right - Strands Visual */}
            <div className="about-visual">
              <Strands
                colors={["#F97316", "#7C3AED", "#06B6D4"]}
                count={4}
                speed={0.5}
                amplitude={1}
                waviness={1}
                thickness={0.7}
                glow={2.6}
                taper={3}
                spread={1}
                intensity={0.6}
                saturation={1.5}
                opacity={1}
                scale={1.5}
                glass={true}
                refraction={1}
                dispersion={1}
                glassSize={1}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="container" style={{ paddingBottom: '80px' }}>
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
      </section>
    </Layout>
  );
}
