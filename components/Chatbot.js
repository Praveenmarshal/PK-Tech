import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your PK_Tech_Warrior AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const msgEndRef = useRef(null);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.reply || "I couldn't process that. Please try again." }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: "Something went wrong. Please try again or contact Praveen at praveenkicha01@gmail.com." }]);
    }
    setLoading(false);
  };

  return (
    <div id="chatbot-widget">
      {open && (
        <div className="chatbot-panel open glass-card" style={{ boxShadow: '0 24px 80px rgba(139,92,246,0.2)' }}>
          <div className="chat-header">
            <span className="chat-header-avatar">🤖</span>
            <div>
              <div className="chat-header-title">PK_Tech_Warrior AI</div>
              <div className="chat-header-sub">● Online — powered by Gemini AI</div>
            </div>
            <button className="chat-close" style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '1rem' }} onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>
            ))}
            {loading && (
              <div className="chat-msg bot">
                <span className="typing-indicator">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </div>
            )}
            <div ref={msgEndRef} />
          </div>
          <div className="chat-suggestions">
            {['Tell me about PK_Tech_Warrior', 'Show your projects', 'Contact Praveen', 'Explain your services'].map(s => (
              <button key={s} className="chat-suggestion" onClick={() => sendMessage(s)}>{s}</button>
            ))}
          </div>
          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
            <button className="chat-send" onClick={() => sendMessage()} disabled={loading}>→</button>
          </div>
        </div>
      )}
      <div className="chatbot-orb" onClick={() => setOpen(o => !o)}>🤖</div>
    </div>
  );
}
