import Layout from '../../components/Layout';
import Link from 'next/link';
import { resources } from '../../lib/data';

export default function ResourceDetail({ resource }) {
  if (!resource) return null;

  return (
    <Layout title={`${resource.title} — ZILIST`}>
      <div style={{ padding: '120px 48px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="breadcrumb">
            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link href="/resources" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Resources</Link>
            <span>›</span>
            <span>{resource.title}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px' }}>
            <div>
              <div style={{
                height: '320px', borderRadius: '20px',
                background: resource.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '5rem', marginBottom: '28px'
              }}>
                {resource.emoji}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', fontSize: '0.72rem', color: 'var(--text-muted)', alignItems: 'center' }}>
                <span>{resource.date}</span>
                <span>·</span>
                <span>{resource.readTime}</span>
                <span>·</span>
                <span style={{ color: 'var(--violet)' }}>{resource.category}</span>
              </div>

              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.4rem', fontWeight: 400, color: 'var(--deep)', marginBottom: '24px', lineHeight: 1.2 }}>
                {resource.title}
              </h1>

              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.85, fontWeight: 300 }}>
                {resource.content.map((para, i) => (
                  <p key={i} style={{ marginBottom: '16px' }}>{para}</p>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '40px' }}>
                <Link href="/resources" className="btn-secondary">← Back to Resources</Link>
                <Link href="/resources" className="btn-primary">Next Article →</Link>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="glass-card toc">
                <h4>Table of Contents</h4>
                {['The Rise of AI Automation', 'Benefits of AI Automation', 'Implementation Steps', 'Real-World Applications', 'The Future Ahead'].map(item => (
                  <div key={item} className="toc-item">{item}</div>
                ))}
              </div>

              <div className="glass-card" style={{ padding: '20px', borderRadius: '16px', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '14px' }}>Related Articles</h4>
                {resources.filter(r => r.id !== resource.id).slice(0, 3).map(r => (
                  <Link key={r.id} href={`/resources/${r.id}`} style={{ display: 'flex', gap: '10px', marginBottom: '12px', textDecoration: 'none', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.2rem' }}>{r.emoji}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--deep)', lineHeight: 1.4 }}>{r.title}</span>
                  </Link>
                ))}
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
    paths: resources.map(r => ({ params: { id: r.id } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const resource = resources.find(r => r.id === params.id) || null;
  return { props: { resource } };
}
