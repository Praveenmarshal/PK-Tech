import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [email, setEmail] = useState('Admin');

  useEffect(() => {
    const token = localStorage.getItem('zilist_token');
    const storedEmail = localStorage.getItem('zilist_email');
    if (!token) { router.push('/admin'); return; }
    setEmail(storedEmail || 'Admin');

    const fetchStats = async () => {
      const [statsRes, msgRes] = await Promise.all([
        fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/messages', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      if (statsRes.ok) setStats(await statsRes.json());
      if (msgRes.ok) setMessages(await msgRes.json());
    };
    fetchStats();
  }, []);

  const logout = () => {
    localStorage.removeItem('zilist_token');
    localStorage.removeItem('zilist_email');
    router.push('/admin');
  };

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'projects', icon: '🗂️', label: 'Projects' },
    { id: 'resources', icon: '📚', label: 'Resources' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
    { id: 'chatbot', icon: '🤖', label: 'Chatbot' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <>
      <Head>
        <title>Admin Dashboard — ZILIST</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@200;300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        :root{--violet:#8b5cf6;--lavender:#c4b5fd;--deep:#0f172a;--text-muted:#64748b}
        body{font-family:'DM Sans',sans-serif;background:#f0eeeb;color:var(--deep)}
        .glass-card{background:rgba(255,255,255,0.68);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.7);border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,0.07)}
        table{width:100%;border-collapse:collapse;font-size:0.74rem}
        th{text-align:left;font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);padding-bottom:10px;border-bottom:1px solid rgba(100,116,139,0.1);font-weight:400}
        td{padding:10px 0;border-bottom:1px solid rgba(100,116,139,0.06);color:var(--deep)}
        .badge{font-size:0.6rem;padding:3px 9px;border-radius:100px;font-weight:500}
        .badge-green{background:rgba(34,197,94,0.1);color:#16a34a}
        .badge-blue{background:rgba(59,130,246,0.1);color:#2563eb}
        .badge-orange{background:rgba(249,115,22,0.1);color:#ea580c}
      `}</style>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <div style={{ width: '220px', flexShrink: 0, background: 'rgba(15,23,42,0.96)', padding: '28px 16px', display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 200 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', fontWeight: 600, color: '#fff', letterSpacing: '0.1em', padding: '0 12px', marginBottom: '32px' }}>ZILIST</div>
          <nav style={{ flex: 1 }}>
            {navItems.map(item => (
              <div
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 12px', borderRadius: '10px',
                  fontSize: '0.78rem',
                  color: activeTab === item.id ? 'var(--lavender)' : 'rgba(255,255,255,0.5)',
                  background: activeTab === item.id ? 'rgba(139,92,246,0.15)' : 'transparent',
                  cursor: 'pointer', transition: 'all 0.2s', marginBottom: '2px'
                }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
          <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.78rem' }}>
            <span>🚪</span><span>Logout</span>
          </button>
        </div>

        {/* Main */}
        <div style={{ marginLeft: '220px', flex: 1, padding: '32px 36px', minHeight: '100vh' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', fontWeight: 400, color: 'var(--deep)' }}>
              {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <span>Welcome back, Administrator</span>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 500 }}>
                {email.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && stats && (
            <>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '28px' }}>
                {[
                  { label: 'Total Projects', value: stats.totalProjects, change: stats.projectsChange },
                  { label: 'Total Messages', value: stats.totalMessages, change: stats.messagesChange },
                  { label: 'Total Clients', value: stats.totalClients, change: stats.clientsChange },
                  { label: 'Total Views', value: `${(stats.totalViews/1000).toFixed(1)}K`, change: stats.viewsChange },
                ].map(s => (
                  <div key={s.label} className="glass-card" style={{ padding: '24px' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{s.label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.2rem', fontWeight: 500, color: 'var(--deep)', lineHeight: 1, marginBottom: '6px' }}>{s.value}</div>
                    <div style={{ fontSize: '0.68rem', color: '#22c55e', fontWeight: 500 }}>{s.change} this month</div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div className="glass-card" style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--deep)', marginBottom: '20px' }}>Views Overview — This Month</h4>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
                    {stats.chartData.map(d => (
                      <div key={d.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{
                          width: '100%', background: 'linear-gradient(to top,#8b5cf6,#c4b5fd)',
                          borderRadius: '4px 4px 0 0', height: `${d.value * 2}px`, opacity: 0.7
                        }} />
                        <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}>{d.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="glass-card" style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--deep)', marginBottom: '16px' }}>Top Services</h4>
                  {stats.services.map((s, i) => (
                    <div key={s.name} style={{ marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--deep)' }}>{s.name}</span>
                        <span style={{ color: 'var(--violet)' }}>{s.pct}%</span>
                      </div>
                      <div style={{ background: 'rgba(139,92,246,0.1)', borderRadius: '4px', height: '6px' }}>
                        <div style={{ background: 'var(--violet)', borderRadius: '4px', height: '6px', width: `${s.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tables */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="glass-card" style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--deep)', marginBottom: '16px' }}>Recent Messages</h4>
                  <table>
                    <thead><tr><th>Name</th><th>Subject</th><th>Status</th></tr></thead>
                    <tbody>
                      {messages.slice(0, 4).map(m => (
                        <tr key={m.id}>
                          <td>{m.name}</td>
                          <td style={{ color: 'var(--text-muted)' }}>{m.subject}</td>
                          <td><span className={`badge ${m.status === 'unread' ? 'badge-blue' : 'badge-green'}`}>{m.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="glass-card" style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--deep)', marginBottom: '16px' }}>Recent Projects</h4>
                  <table>
                    <thead><tr><th>Project</th><th>Category</th><th>Status</th></tr></thead>
                    <tbody>
                      {stats.recentProjects.map(p => (
                        <tr key={p.id}>
                          <td>{p.name}</td>
                          <td style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{p.category}</td>
                          <td><span className="badge badge-green">{p.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--deep)', marginBottom: '16px' }}>All Contact Messages ({messages.length})</h4>
              <table>
                <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Date</th><th>Status</th></tr></thead>
                <tbody>
                  {messages.map(m => (
                    <tr key={m.id}>
                      <td style={{ fontWeight: 500 }}>{m.name}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{m.email}</td>
                      <td>{m.subject}</td>
                      <td style={{ color: 'var(--text-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.message}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{m.date}</td>
                      <td><span className={`badge ${m.status === 'unread' ? 'badge-blue' : 'badge-green'}`}>{m.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--deep)', marginBottom: '16px' }}>Projects Management</h4>
              <table>
                <thead><tr><th>Project</th><th>Category</th><th>Tags</th><th>Actions</th></tr></thead>
                <tbody>
                  {[
                    { name: 'AI Chatbot Platform', cat: 'AI Solutions', tag: 'AI Solutions' },
                    { name: 'Analytics Dashboard', cat: 'Dashboards', tag: 'Dashboards' },
                    { name: 'Gym Management System', cat: 'Web Application', tag: 'Web Dev' },
                    { name: 'AI Automation Platform', cat: 'Automation', tag: 'Automation' },
                    { name: 'Cybersecurity Dashboard', cat: 'Security', tag: 'Security' },
                    { name: 'Portfolio System', cat: 'Web Development', tag: 'Web Dev' },
                  ].map(p => (
                    <tr key={p.name}>
                      <td style={{ fontWeight: 500 }}>{p.name}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{p.cat}</td>
                      <td><span className="badge badge-blue">{p.tag}</span></td>
                      <td>
                        <span style={{ color: 'var(--violet)', cursor: 'pointer', fontSize: '0.7rem' }}>Edit</span>
                        <span style={{ color: 'var(--text-muted)', marginLeft: '8px', cursor: 'pointer', fontSize: '0.7rem' }}>View</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
              {['Page Views: 12,500', 'Bounce Rate: 34%', 'Avg Session: 3m 42s', 'Conversion Rate: 4.2%'].map(stat => (
                <div key={stat} className="glass-card" style={{ padding: '32px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', color: 'var(--violet)', marginBottom: '8px' }}>{stat.split(': ')[1]}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stat.split(': ')[0]}</div>
                </div>
              ))}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="glass-card" style={{ padding: '32px', maxWidth: '500px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '24px' }}>Account Settings</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Logged in as: {email}</p>
              <button onClick={logout} style={{ padding: '10px 24px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '100px', cursor: 'pointer', fontSize: '0.8rem' }}>
                Logout
              </button>
            </div>
          )}

          {['resources', 'chatbot'].includes(activeTab) && (
            <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚧</div>
              <p style={{ color: 'var(--text-muted)' }}>This section is coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
