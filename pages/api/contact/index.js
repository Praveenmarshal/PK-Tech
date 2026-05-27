import { addMessage } from '../../../lib/data';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    const newMsg = addMessage({ name, email, subject: subject || 'General Inquiry', message });
    return res.status(200).json({ success: true, id: newMsg.id, message: 'Your message has been received!' });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
