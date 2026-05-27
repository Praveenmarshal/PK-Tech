import { projects } from '../../../lib/data';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id, category } = req.query;
    if (id) {
      const project = projects.find(p => p.id === id);
      if (!project) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(project);
    }
    if (category && category !== 'All') {
      return res.status(200).json(projects.filter(p => p.tag === category));
    }
    return res.status(200).json(projects);
  }
  res.status(405).json({ error: 'Method not allowed' });
}
