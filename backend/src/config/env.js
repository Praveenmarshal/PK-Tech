/**
 * env.js — single source of truth for every environment variable.
 * Throws at startup if a required variable is missing so the app
 * never silently runs with broken config.
 */

"use strict";

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

function required(key) {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

function optional(key, fallback = "") {
  return process.env[key] || fallback;
}

const env = {
  // ── Server ────────────────────────────────────────────────────
  NODE_ENV:    optional("NODE_ENV", "development"),
  PORT:        parseInt(optional("PORT", "5000"), 10),
  CLIENT_URL:  optional("CLIENT_URL", "http://localhost:5000"),

  // ── Database ──────────────────────────────────────────────────
  MONGODB_URI: optional("MONGODB_URI"),          // optional so app boots without DB
  MONGODB_DB:  optional("MONGODB_DB", "zilist"),

  // ── Auth / JWT ────────────────────────────────────────────────
  JWT_SECRET:     required("JWT_SECRET"),
  JWT_EXPIRES_IN: optional("JWT_EXPIRES_IN", "7d"),

  // ── Admin seed ────────────────────────────────────────────────
  ADMIN_EMAIL:    optional("ADMIN_EMAIL"),
  ADMIN_PASSWORD: optional("ADMIN_PASSWORD"),

  // ── Email / SMTP ──────────────────────────────────────────────
  SMTP_HOST: optional("SMTP_HOST"),
  SMTP_PORT: parseInt(optional("SMTP_PORT", "587"), 10),
  SMTP_USER: optional("SMTP_USER"),
  SMTP_PASS: optional("SMTP_PASS"),
  MAIL_FROM: optional("MAIL_FROM"),
  MAIL_TO:   optional("MAIL_TO"),

  // ── Cloudinary ────────────────────────────────────────────────
  CLOUDINARY_CLOUD_NAME: optional("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY:    optional("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: optional("CLOUDINARY_API_SECRET"),

  // ── AI ────────────────────────────────────────────────────────
  OPENAI_API_KEY:  optional("OPENAI_API_KEY"),
  OPENAI_MODEL:    optional("OPENAI_MODEL", "gpt-4o-mini"),
  GEMINI_API_KEY:  optional("GEMINI_API_KEY"),
  GEMINI_MODEL:    optional("GEMINI_MODEL", "gemini-1.5-flash"),

  // ── Security ──────────────────────────────────────────────────
  ENCRYPTION_KEY: optional("ENCRYPTION_KEY"),    // 32-char hex for AES-256
  API_KEY_SECRET: optional("API_KEY_SECRET"),    // salt for generated API keys
  CSRF_SECRET:    optional("CSRF_SECRET"),
};

// Convenience helpers
env.isProduction  = env.NODE_ENV === "production";
env.isDevelopment = env.NODE_ENV === "development";
env.isMongoConfigured = Boolean(
  env.MONGODB_URI && !env.MONGODB_URI.includes("<username>")
);
env.isEmailConfigured = Boolean(
  env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS &&
  !env.SMTP_PASS.includes("replace-with") &&
  env.SMTP_PASS !== "PASTE_YOUR_NEW_APP_PASSWORD_HERE"
);
env.isCloudinaryConfigured = Boolean(
  env.CLOUDINARY_CLOUD_NAME &&
  env.CLOUDINARY_API_KEY &&
  !env.CLOUDINARY_API_KEY.includes("replace-")
);

module.exports = env;
