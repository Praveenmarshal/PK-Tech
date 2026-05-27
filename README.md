# ZILIST — Build Smarter. Automate Everything.

Complete fullstack Next.js website. 12 pages, full backend API, admin dashboard.

## Quick Start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm start         # production server
```

## Pages

| # | Route | Description |
|---|-------|-------------|
| 01 | `/` | Home — hero, features, CTA |
| 02 | `/features` | All 12 platform capabilities |
| 03 | `/solutions` | 8 AI service domains |
| 04 | `/projects` | Filterable project grid |
| 05 | `/projects/[id]` | Project detail + tech stack |
| 06 | `/about` | Team, stats, mission/vision |
| 07 | `/resources` | Article & guide library |
| 08 | `/resources/[id]` | Article detail + TOC |
| 09 | `/contact` | Contact form (sends to API) |
| 10 | (widget) | AI Chatbot on every page |
| 11 | `/portfolio` | Portfolio redirect page |
| 12 | `/admin` + `/admin/dashboard` | Admin login + full dashboard |

## Admin Credentials
- **Email:** praveenkicha01@gmail.com  
- **Password:** zilist2024

## API Routes
- `GET /api/projects` — all projects
- `GET /api/resources` — all resources
- `POST /api/contact` — submit contact form
- `POST /api/auth/login` — admin login
- `GET /api/admin/stats` — dashboard stats (auth required)
- `GET /api/admin/messages` — contact messages (auth required)

## Tech Stack
- **Frontend:** Next.js 16, React 19, Three.js, Glassmorphism CSS
- **Backend:** Next.js API Routes, token-based auth, in-memory store
- **Fonts:** Cormorant Garamond + DM Sans + Space Mono
- **Deploy:** Vercel (`vercel --prod`) or any Node.js host

## Structure
```
pages/          All 12 pages + API routes
components/     Layout, Navbar, Footer, Chatbot
styles/         globals.css — full design system
lib/data.js     In-memory store (swap for real DB in prod)
```
