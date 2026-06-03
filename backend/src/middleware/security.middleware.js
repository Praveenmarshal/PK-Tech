"use strict";

const helmet = require("helmet");
const cors   = require("cors");
const env    = require("../config/env");

const allowedOrigins = env.CLIENT_URL
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

/** Helmet with sane CSP defaults */
const helmetMiddleware = helmet({
  contentSecurityPolicy: env.isProduction
    ? {
        directives: {
          defaultSrc:  ["'self'"],
          scriptSrc:   ["'self'"],
          styleSrc:    ["'self'", "'unsafe-inline'"],
          imgSrc:      ["'self'", "data:", "res.cloudinary.com"],
          connectSrc:  ["'self'"],
          fontSrc:     ["'self'"],
          objectSrc:   ["'none'"],
          upgradeInsecureRequests: [],
        },
      }
    : false,
  crossOriginEmbedderPolicy: false,
});

/** CORS — restrict to listed origins in production */
const corsMiddleware = cors({
  origin: allowedOrigins.length ? allowedOrigins : true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
});

/** Strip prototype-pollution keys from req.body / req.query */
function sanitiseInput(req, _res, next) {
  const dangerous = ["__proto__", "constructor", "prototype"];

  function clean(obj) {
    if (!obj || typeof obj !== "object") return;
    for (const key of Object.keys(obj)) {
      if (dangerous.includes(key)) delete obj[key];
      else clean(obj[key]);
    }
  }

  clean(req.body);
  clean(req.query);
  next();
}

module.exports = { helmetMiddleware, corsMiddleware, sanitiseInput };
