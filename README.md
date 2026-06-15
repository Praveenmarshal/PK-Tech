# PK Tech — Secure Full-Stack Web Application

## Project Structure

```
PK Tech_white/
├── frontend/                   # Static HTML/CSS/JS client
│   ├── src/
│   │   ├── components/         # Reusable HTML components (navbar, footer, etc.)
│   │   ├── pages/              # All .html pages
│   │   ├── services/
│   │   │   └── api.js          # Centralised API client (no keys here)
│   │   └── hooks/              # Future JS utility hooks
│   ├── public/
│   │   └── assets/             # Videos, images, CSS, JS, fonts, shaders
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.js          # ★ Single source of truth for all env vars
│   │   │   ├── db.js           # MongoDB connection
│   │   │   ├── redis.js        # Redis connection (optional)
│   │   │   └── cloudinary.js   # Cloudinary SDK config
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── ai.controller.js
│   │   │   └── ...             # One controller per domain
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── ai.routes.js
│   │   │   └── ...
│   │   ├── services/
│   │   │   ├── openai.service.js
│   │   │   ├── email.service.js
│   │   │   ├── twilio.service.js
│   │   │   ├── cloudinary.service.js
│   │   │   └── knowledgeBase.service.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js        # JWT verification
│   │   │   ├── admin.middleware.js       # Role-based access
│   │   │   ├── rateLimit.middleware.js   # Per-route rate limits
│   │   │   ├── security.middleware.js    # Helmet + CORS + sanitise
│   │   │   ├── csrf.middleware.js        # CSRF token issue + verify
│   │   │   ├── validation.middleware.js  # Request body validation
│   │   │   └── upload.middleware.js      # Multer file uploads
│   │   ├── validators/
│   │   │   ├── auth.validator.js
│   │   │   └── ai.validator.js
│   │   ├── utils/
│   │   │   ├── jwt.js           # sign / verify helpers
│   │   │   ├── logger.js        # Structured logger → src/logs/
│   │   │   ├── encrypt.js       # AES-256-GCM field encryption
│   │   │   ├── generateApiKey.js
│   │   │   ├── sendEmail.js
│   │   │   └── seedAdmin.js
│   │   ├── models/              # Mongoose schemas
│   │   ├── logs/                # Runtime log files (git-ignored)
│   │   ├── app.js               # Express app factory
│   │   └── server.js            # Entry point
│   ├── .env                     # ⚠ SECRETS — never commit
│   ├── .env.example             # Safe template to commit
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   └── ecosystem.config.js      # PM2 production config
│
├── nginx/
│   └── nginx.conf               # Reverse proxy + security headers
├── docker-compose.yml
└── README.md
```

---

## Quick Start

### 1. Configure environment

```bash
cd backend
cp .env.example .env
# Fill in all values in .env — never skip JWT_SECRET
```

### 2. Run locally (without Docker)

```bash
cd backend
npm install
npm run dev        # starts nodemon on :5000

# In a separate terminal — serve the frontend
cd ../frontend
npx serve src/pages -l 8000
```

### 3. Run with Docker

```bash
# Fill backend/.env first, then:
docker compose up --build
# App available at http://localhost:80
```

---

## API Key & Secret Protection

| Concern | Solution |
|---|---|
| Secrets in code | All keys read from `.env` via `src/config/env.js` — never hardcoded |
| `.env` in git | `.gitignore` excludes `.env`; `.env.example` provides a safe template |
| API key exposure to frontend | Frontend never holds keys; all AI/email/cloud calls go through `/api/*` |
| JWT brute-force | `authLimiter` — 10 requests per 15 min per IP |
| Chatbot abuse | `chatLimiter` — 30 requests per minute per IP |
| XSS / injection | Helmet CSP + prototype-pollution sanitiser |
| CSRF | Token issued at `GET /api/csrf`, verified on all mutations |
| Sensitive DB fields | `src/utils/encrypt.js` — AES-256-GCM at rest |
| Plaintext passwords | bcrypt via `Admin.hashPassword()` |
| Server info leakage | `server_tokens off` in nginx; no stack traces in production |

---

## Environment Variables

See `backend/.env.example` for the full list. Required at startup:

- `JWT_SECRET` — long random string (64+ hex chars)
- `ADMIN_EMAIL` + `ADMIN_PASSWORD` — initial admin credentials
- `MONGODB_URI` — MongoDB Atlas connection string

Everything else (Cloudinary, SMTP, OpenAI, Gemini) degrades gracefully when omitted.
