import Layout from '../components/Layout';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <Layout title="Contact — ZILIST">
      <section style={{ paddingTop: '140px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Get in Touch</div>
            <h2 className="section-title">Let's build your next<br />big AI project.</h2>
          </div>

          <div className="contact-layout">
            {/* Info */}
            <div className="contact-info-list">
              {[
                { icon: '📧', label: 'Email', value: 'praveenkicha01@gmail.com', href: 'mailto:praveenkicha01@gmail.com' },
                { icon: '📞', label: 'Phone', value: '+91 8825870266', href: 'tel:+918825870266' },
                { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/praveen-kannan', href: 'https://www.linkedin.com/in/praveen-kannan-6862382a2' },
                { icon: '🐙', label: 'GitHub', value: 'github.com/Praveenmarshal', href: 'https://github.com/Praveenmarshal' },
                { icon: '🌐', label: 'Portfolio', value: 'praveen-kannan-4607.vercel.app', href: 'https://praveen-kannan-4607.vercel.app/' },
              ].map(item => (
                <a key={item.label} href={item.href} target="_blank" rel="noopener" className="glass-card contact-info-item">
                  <div className="contact-info-icon">{item.icon}</div>
                  <div>
                    <div className="contact-info-label">{item.label}</div>
                    <div className="contact-info-value">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Form */}
            <div className="glass-card contact-form">
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', fontWeight: 400, color: 'var(--deep)', marginBottom: '6px' }}>Send a Message</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '28px', lineHeight: 1.6 }}>
                Fill out the form and Praveen will get back to you within 24 hours.
              </p>

              {status === 'success' && (
                <div className="success-banner" style={{ display: 'block' }}>✓ Message sent! Praveen will reply within 24 hours.</div>
              )}
              {status === 'error' && (
                <div className="error-banner" style={{ display: 'block' }}>Something went wrong. Please try again.</div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Praveen Kannan" />
                </div>
                <div className="form-group">
                  <label>Your Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="AI Chatbot Project" />
              </div>
              <div className="form-group">
                <label>Your Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." rows={5} />
              </div>
              <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Sending…' : 'Send Message →'}
              </button>
            </div>

            {/* Social */}
            <div className="social-cards">
              {[
                { icon: '💼', name: 'LinkedIn', handle: 'Connect professionally', href: 'https://www.linkedin.com/in/praveen-kannan-6862382a2', bg: 'rgba(10,102,194,0.08)' },
                { icon: '🐙', name: 'GitHub', handle: 'Explore my code', href: 'https://github.com/Praveenmarshal', bg: 'rgba(0,0,0,0.04)' },
                { icon: '🌐', name: 'Portfolio', handle: 'See all my work', href: 'https://praveen-kannan-4607.vercel.app/', bg: 'rgba(139,92,246,0.08)' },
                { icon: '📧', name: 'Email Direct', handle: 'praveenkicha01@gmail.com', href: 'mailto:praveenkicha01@gmail.com', bg: 'rgba(234,67,53,0.06)' },
              ].map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener" className="glass-card social-card" style={{ textDecoration: 'none' }}>
                  <div className="social-icon" style={{ background: s.bg }}>{s.icon}</div>
                  <div>
                    <div className="social-name">{s.name}</div>
                    <div className="social-handle">{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
