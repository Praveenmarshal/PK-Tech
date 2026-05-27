import Layout from '../components/Layout';
import Link from 'next/link';

export default function Portfolio() {
  return (
    <Layout title="Portfolio — ZILIST">
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 48px' }}>
        <div style={{ maxWidth: '520px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '28px', display: 'inline-block', animation: 'spin-slow 8s linear infinite' }}>🌐</div>
          <h1 className="section-title" style={{ fontSize: '3rem', marginBottom: '16px' }}>Explore My Complete<br />Portfolio</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '36px', fontWeight: 300 }}>
            Visit my personal portfolio website to explore all my projects, case studies, and work.
          </p>
          <a href="https://praveen-kannan-4607.vercel.app/" target="_blank" rel="noopener" className="btn-primary" style={{ display: 'inline-flex' }}>
            Visit Portfolio ↗
          </a>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '20px', letterSpacing: '0.04em' }}>
            praveen-kannan-4607.vercel.app ↗
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
            <Link href="/projects" className="btn-secondary" style={{ fontSize: '0.75rem', padding: '10px 20px' }}>All Projects</Link>
            <Link href="/resources" className="btn-secondary" style={{ fontSize: '0.75rem', padding: '10px 20px' }}>Case Studies</Link>
            <Link href="/resources" className="btn-secondary" style={{ fontSize: '0.75rem', padding: '10px 20px' }}>Blogs</Link>
            <Link href="/about" className="btn-secondary" style={{ fontSize: '0.75rem', padding: '10px 20px' }}>Resume</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
