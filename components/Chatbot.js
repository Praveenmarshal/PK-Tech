import { useState, useRef, useEffect } from 'react';

const RESPONSES = {
  'zilist': 'ZILIST is a premium AI company founded by Praveen Kannan. We build futuristic AI systems, chatbots, automation platforms, dashboards, and premium full-stack digital experiences. 🚀',
  'projects': 'We have 6 showcase projects: AI Chatbot Platform, Analytics Dashboard, Gym Management System, AI Automation Platform, Cybersecurity Dashboard, and Portfolio System. Check out our Projects page!',
  'contact': 'You can reach Praveen at praveenkicha01@gmail.com or call +91 8825870266. You can also connect on LinkedIn or visit the Contact page. 📬',
  'services': 'ZILIST offers: AI & Machine Learning, Web Development, Data Analytics, Automation Systems, Cybersecurity, AI Dashboards, Data Science, and AI Business Solutions. Which interests you most?',
  'build': 'Absolutely! AI systems are our core specialty. From custom LLM integrations to AI chatbots, automation pipelines, and intelligent dashboards — ZILIST builds it all. Contact Praveen to discuss!',
  'portfolio': 'Visit Praveen\'s complete portfolio at praveen-kannan-4607.vercel.app to see all projects, case studies, and live demos!'
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your ZILIST AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const msgEndRef = useRef(null);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);

    const key = Object.keys(RESPONSES).find(k => userText.toLowerCase().includes(k));
    const response = key ? RESPONSES[key] : "That's a great question! I'd recommend contacting Praveen directly at praveenkicha01@gmail.com for detailed answers. He'll get back to you within 24 hours. 💫";

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    }, 800);
  };

  return (
    <div id="chatbot-widget">
      {open && (
        <div className="chatbot-panel open glass-card" style={{ boxShadow: '0 24px 80px rgba(139,92,246,0.2)' }}>
          <div className="chat-header">
            <span className="chat-header-avatar">🤖</span>
            <div>
              <div className="chat-header-title">ZILIST AI Assistant</div>
              <div className="chat-header-sub">● Online — ready to help</div>
            </div>
            <button className="chat-close" style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '1rem' }} onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>
            ))}
            <div ref={msgEndRef} />
          </div>
          <div className="chat-suggestions">
            {['Tell me about ZILIST', 'Show your projects', 'Contact Praveen', 'Explain your services'].map(s => (
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
            />
            <button className="chat-send" onClick={() => sendMessage()}>→</button>
          </div>
        </div>
      )}
      <div className="chatbot-orb" onClick={() => setOpen(o => !o)}>🤖</div>
    </div>
  );
}
