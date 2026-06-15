# PK Tech API

Base URL: `/api`

## Public

- `GET /health`
- `GET /projects`
- `GET /projects/:slug`
- `GET /resources`
- `GET /resources/:slug`
- `GET /testimonials`
- `POST /contact`
- `POST /chatbot/message`
- `POST /analytics/event`

## Private Admin

All private routes require `Authorization: Bearer <token>`.

- `POST /auth/login`
- `GET /auth/me`
- `GET /projects/admin`
- `POST /projects`
- `PUT /projects/:id`
- `DELETE /projects/:id`
- `GET /resources/admin`
- `POST /resources`
- `PUT /resources/:id`
- `DELETE /resources/:id`
- `GET /contact/messages`
- `PUT /contact/messages/:id`
- `POST /payments`
- `POST /payments/upload`
- `POST /testimonials`
- `POST /chatbot/knowledge`
- `GET /chatbot/conversations`
- `GET /settings`
- `PUT /settings`

