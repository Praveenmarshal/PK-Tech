import { getMessages, updateMessageStatus } from '../../../lib/data';
import { verifyToken } from '../auth/login';

export default function handler(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(getMessages());
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body;
    const msg = updateMessageStatus(id, status);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    return res.status(200).json(msg);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
