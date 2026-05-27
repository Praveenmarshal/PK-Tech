import Layout from '../../components/Layout';
import Link from 'next/link';
import { projects } from '../../lib/data';

export default function ProjectDetail({ project }) {
  if (!project) return null;

  return (
    <Layout title={`${project.name} — ZILIST`}>
      <div style={{ padding: '120px 48px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="breadcrumb">
            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link href="/projects" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Projects</Link>
            <span>›</span>
            <span>{project.name}</span>
          </div>

          {/* Banner */}
          <div style={{
            height: '340px', borderRadius: '24px', overflow: 'hidden',
            background: project.gradient,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '6rem', marginBottom: '40px',
            boxShadow: '0 20px 60px rgba(139,92,246,0.15)'
          }}>
            {project.emoji}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px' }}>
            {/* Main */}
            <div>
              <div className="section-eyebrow">{project.category}</div>
              <h2 className="section-title" style={{ fontSize: '2.2rem' }}>{project.name}</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300, marginBottom: '28px', maxWidth: '520px' }}>
                {project.longDesc}
              </p>
              <div style={{ marginTop: '28px' }}>
                <h3 style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '14px' }}>Key Features</h3>
                {project.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: 'var(--deep)', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--violet)', fontWeight: 600 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '40px' }}>
                <Link href="/projects" className="btn-secondary">← Back to Projects</Link>
                <Link href="/contact" className="btn-primary">Build Similar →</Link>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '14px' }}>Technologies Used</h3>
                <div>
                  {project.techs.map(t => (
                    <span key={t} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>
              <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.06em' }}>Project Results</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', color: 'var(--violet)', fontWeight: 500 }}>{project.result}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{project.resultLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: projects.map(p => ({ params: { id: p.id } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const project = projects.find(p => p.id === params.id) || null;
  return { props: { project } };
}
