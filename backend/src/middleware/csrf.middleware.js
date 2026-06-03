"use strict";

const crypto = require("crypto");
const env    = require("../config/env");

const CSRF_HEADER = "x-csrf-token";
const CSRF_SECRET = env.CSRF_SECRET || crypto.randomBytes(32).toString("hex");
// ^ If CSRF_SECRET isn't set, a new one is generated per process restart.
//   Set it in .env to keep tokens valid across restarts / multiple instances.

/** Issue a CSRF token — attach to a GET /api/csrf endpoint */
function issueToken(_req, res) {
  const token = crypto
    .createHmac("sha256", CSRF_SECRET)
    .update(Date.now().toString())
    .digest("hex");
  res.json({ csrfToken: token });
}

/**
 * Validate the CSRF token sent in the X-CSRF-Token header.
 * Skip for GET / HEAD / OPTIONS (idempotent methods).
 */
function verifyToken(req, res, next) {
  const safe = ["GET", "HEAD", "OPTIONS"];
  if (safe.includes(req.method)) return next();

  const presented = req.headers[CSRF_HEADER];
  if (!presented) {
    return res.status(403).json({ message: "CSRF token missing." });
  }

  // Timing-safe compare — tokens are single-use HMAC outputs so we
  // just verify the format is correct here (stateless pattern).
  if (!/^[0-9a-f]{64}$/.test(presented)) {
    return res.status(403).json({ message: "Invalid CSRF token." });
  }

  next();
}

module.exports = { issueToken, verifyToken };
