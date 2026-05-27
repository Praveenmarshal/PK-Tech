import { verifyToken } from '../auth/login';
import { getMessages, projects } from '../../../lib/data';

export default function handler(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!verifyToken(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.method === 'GET') {
    const messages = getMessages();
    return res.status(200).json({
      totalProjects: projects.length,
      totalMessages: messages.length,
      totalClients: 320,
      totalViews: 12500,
      projectsChange: '+12.5%',
      messagesChange: '+8.3%',
      clientsChange: '+20.8%',
      viewsChange: '+25.0%',
      recentMessages: messages.slice(0, 3),
      recentProjects: projects.slice(0, 3).map(p => ({ id: p.id, name: p.name, category: p.category, status: 'Published' })),
      chartData: [
        { label: 'May 1', value: 20 },
        { label: 'May 8', value: 35 },
        { label: 'May 15', value: 28 },
        { label: 'May 22', value: 45 },
        { label: 'May 29', value: 38 },
      ],
      services: [
        { name: 'AI Solutions', pct: 40 },
        { name: 'Web Dev', pct: 25 },
        { name: 'Dashboards', pct: 20 },
        { name: 'Automation', pct: 15 },
      ]
    });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
