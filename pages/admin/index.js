import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('zilist_token', data.token);
        localStorage.setItem('zilist_email', data.email);
        router.push('/admin/dashboard');
      } else {
        setError('Invalid email or password.');
      }
    } catch {
      setError('Something went wrong. Try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Admin Login — ZILIST</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@200;300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        :root{--violet:#8b5cf6;--deep:#0f172a;--text-muted:#64748b}
        body{font-family:'DM Sans',sans-serif;background:#f0eeeb;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
        .glass-card{background:rgba(255,255,255,0.68);backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,0.7);border-radius:20px;box-shadow:0 8px 40px rgba(0,0,0,0.07)}
        input{width:100%;padding:12px 16px;background:rgba(255,255,255,0.6);border:1px solid rgba(100,116,139,0.15);border-radius:12px;font-family:'DM Sans',sans-serif;font-size:0.82rem;color:var(--deep);outline:none;transition:all 0.2s}
        input:focus{border-color:rgba(139,92,246,0.4);background:rgba(255,255,255,0.85)}
        label{display:block;font-size:0.68rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:8px}
      `}</style>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div className="glass-card" style={{ padding: '48px', borderRadius: '24px', textAlign: 'center' }}>
          <div style={{
            width: '60px', height: '60px',
            background: 'linear-gradient(135deg,#8b5cf6,#7c3aed)',
            borderRadius: '16px', margin: '0 auto 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.6rem', boxShadow: '0 12px 32px rgba(139,92,246,0.35)'
          }}>🔒</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 400, color: 'var(--deep)', marginBottom: '8px' }}>Admin Access</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '32px' }}>Enter your credentials to continue</div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#dc2626', padding: '12px', borderRadius: '10px', fontSize: '0.76rem', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <div style={{ textAlign: 'left', marginBottom: '14px' }}>
            <label>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="praveenkicha01@gmail.com" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          </div>
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: '100%', padding: '13px',
              background: 'var(--violet)', color: '#fff', border: 'none', borderRadius: '100px',
              fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(139,92,246,0.35)', transition: 'all 0.25s'
            }}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '20px' }}>
            Demo: praveenkicha01@gmail.com / zilist2024
          </p>
        </div>
      </div>
    </>
  );
}
