import { resources } from '../../../lib/data';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;
    if (id) {
      const resource = resources.find(r => r.id === id);
      if (!resource) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(resource);
    }
    return res.status(200).json(resources);
  }
  res.status(405).json({ error: 'Method not allowed' });
}
