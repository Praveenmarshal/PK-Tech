import Layout from '../../components/Layout';
import Link from 'next/link';
import { useState } from 'react';
import { projects } from '../../lib/data';

const filters = ['All', 'AI Solutions', 'Web Development', 'Dashboards', 'Automation', 'Security'];

export default function Projects({ initialProjects }) {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? initialProjects : initialProjects.filter(p => p.tag === active);

  return (
    <Layout title="Projects — ZILIST">
      <section style={{ paddingTop: '140px' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">Portfolio</div>
              <h2 className="section-title">Our Latest Projects</h2>
            </div>
          </div>

          <div className="projects-filter">
            {filters.map(f => (
              <button
                key={f}
                className={`filter-btn${active === f ? ' active' : ''}`}
                onClick={() => setActive(f)}
              >{f}</button>
            ))}
          </div>

          <div className="projects-grid">
            {filtered.map(p => (
              <Link key={p.id} href={`/projects/${p.id}`} style={{ textDecoration: 'none' }}>
                <div className="glass-card project-card">
                  <div className="project-thumb" style={{ background: p.gradient }}>{p.emoji}</div>
                  <div className="project-info">
                    <div className="project-tags"><span className="project-tag">{p.tag}</span></div>
                    <div className="project-name">{p.name}</div>
                    <div className="project-desc">{p.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/contact" className="btn-primary">Start Your Project →</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { initialProjects: projects } };
}
