"use strict";

const express  = require("express");
const morgan   = require("morgan");
const path     = require("path");

const env          = require("./config/env");
const logger       = require("./utils/logger");
const { helmetMiddleware, corsMiddleware, sanitiseInput } = require("./middleware/security.middleware");
const { apiLimiter }   = require("./middleware/rateLimit.middleware");
const { issueToken }   = require("./middleware/csrf.middleware");
const errorHandler     = require("./middleware/errorHandler.middleware");

// ── Routes ──────────────────────────────────────────────────────────────────
const authRoutes        = require("./routes/auth.routes");
const aiRoutes          = require("./routes/ai.routes");
const projectRoutes     = require("./routes/project.routes");
const resourceRoutes    = require("./routes/resource.routes");
const testimonialRoutes = require("./routes/testimonial.routes");
const feedbackRoutes    = require("./routes/feedback.routes");
const contactRoutes     = require("./routes/contact.routes");
const analyticsRoutes   = require("./routes/analytics.routes");
const paymentRoutes     = require("./routes/payment.routes");
const settingsRoutes    = require("./routes/settings.routes");

const app = express();

// ── Security & parsing ───────────────────────────────────────────────────────
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(sanitiseInput);
app.use(morgan(env.isProduction ? "combined" : "dev", { stream: logger.stream }));

// ── Rate limiting ────────────────────────────────────────────────────────────
app.use("/api", apiLimiter);

// ── Health & CSRF ─────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, name: "PK Tech API", environment: env.NODE_ENV })
);
app.get("/api/csrf", issueToken);

// ── API routes ───────────────────────────────────────────────────────────────
app.use("/api/auth",         authRoutes);
app.use("/api/chatbot",      aiRoutes);
app.use("/api/projects",     projectRoutes);
app.use("/api/resources",    resourceRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/feedback",     feedbackRoutes);
app.use("/api/contact",      contactRoutes);
app.use("/api/analytics",    analyticsRoutes);
app.use("/api/payments",     paymentRoutes);
app.use("/api/settings",     settingsRoutes);

// ── Serve static frontend ────────────────────────────────────────────────────
const frontendPath = path.resolve(__dirname, "../../frontend/src/pages");
app.use(express.static(path.resolve(__dirname, "../../frontend/public")));
app.use(express.static(frontendPath));
app.get("/", (_req, res) => res.sendFile(path.join(frontendPath, "index.html")));

// ── Error handler (must be last) ─────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
