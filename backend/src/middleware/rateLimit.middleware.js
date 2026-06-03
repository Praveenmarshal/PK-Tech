"use strict";

const rateLimit = require("express-rate-limit");

/** General API limiter — 100 req / 15 min per IP */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});

/** Strict limiter for auth endpoints — 10 req / 15 min per IP */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Please wait before retrying." },
});

/** Chatbot limiter — 30 req / min per IP */
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Chatbot rate limit reached. Please slow down." },
});

module.exports = { apiLimiter, authLimiter, chatLimiter };
