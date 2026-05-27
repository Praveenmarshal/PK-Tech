import { ADMIN_CREDENTIALS } from '../../../lib/data';

// Simple JWT-like token (in prod use proper JWT)
function createToken(email) {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + 86400000 })).toString('base64');
  return `zilist_${payload}`;
}

export function verifyToken(token) {
  if (!token || !token.startsWith('zilist_')) return null;
  try {
    const payload = JSON.parse(Buffer.from(token.replace('zilist_', ''), 'base64').toString());
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const token = createToken(email);
      return res.status(200).json({ success: true, token, email });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
