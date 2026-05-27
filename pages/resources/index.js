import Layout from '../../components/Layout';
import Link from 'next/link';
import { useState } from 'react';
import { resources } from '../../lib/data';

const cats = ['All', 'Articles', 'Tutorials', 'Guides', 'Tools', 'Templates'];

export default function Resources({ initialResources }) {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <Layout title="Resources — ZILIST">
      <section style={{ paddingTop: '140px' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">Knowledge Hub</div>
              <h2 className="section-title">AI Resources &amp; Insights</h2>
            </div>
            <p className="section-subtitle">Explore our articles, guides and tutorials about AI, automation and technology.</p>
          </div>

          <div className="resources-filter" style={{ display: 'flex', gap: '6px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {cats.map(c => (
              <button key={c} className={`filter-btn${activeFilter === c ? ' active' : ''}`} onClick={() => setActiveFilter(c)}>{c}</button>
            ))}
          </div>

          <div className="resources-grid">
            {initialResources.map(r => (
              <Link key={r.id} href={`/resources/${r.id}`} style={{ textDecoration: 'none' }}>
                <div className="glass-card resource-card">
                  <div className="resource-thumb" style={{ background: r.gradient }}>{r.emoji}</div>
                  <div className="resource-body">
                    <div className="resource-meta">
                      <span>{r.date}</span>
                      <span>·</span>
                      <span>{r.readTime}</span>
                    </div>
                    <div className="resource-title">{r.title}</div>
                    <div className="resource-excerpt">{r.excerpt}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/contact" className="btn-primary">View All Resources</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { initialResources: resources } };
}
