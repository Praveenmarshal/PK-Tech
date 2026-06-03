# ── Stage 1: dependencies ─────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# ── Stage 2: production image ─────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

# Non-root user for security
RUN addgroup -S zilist && adduser -S zilist -G zilist

COPY --from=deps /app/node_modules ./node_modules
COPY src ./src

# Logs directory (writable by app user)
RUN mkdir -p src/logs && chown -R zilist:zilist src/logs

USER zilist

ENV NODE_ENV=production
EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

CMD ["node", "src/server.js"]
