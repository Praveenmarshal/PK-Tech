"use strict";

const crypto = require("crypto");
const env    = require("../config/env");

/**
 * generateApiKey() — creates a cryptographically random API key.
 * Format: zl_<random-32-hex-chars>
 * Returns { key, hash } — store only the hash; show key once to the user.
 */
function generateApiKey() {
  const raw  = crypto.randomBytes(32).toString("hex");
  const key  = `zl_${raw}`;
  const hash = crypto
    .createHmac("sha256", env.API_KEY_SECRET || "pktech-api-key-secret")
    .update(key)
    .digest("hex");
  return { key, hash };
}

/**
 * Verifies a presented API key against a stored hash.
 */
function verifyApiKey(presented, storedHash) {
  const hash = crypto
    .createHmac("sha256", env.API_KEY_SECRET || "pktech-api-key-secret")
    .update(presented)
    .digest("hex");
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(storedHash));
}

module.exports = { generateApiKey, verifyApiKey };
