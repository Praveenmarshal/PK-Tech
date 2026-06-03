"use strict";

/**
 * redis.js — Redis client configuration.
 * Used by rate-limiting and session middleware.
 * Falls back gracefully when Redis is not configured.
 */

const env = require("./env");
const logger = require("../utils/logger");

let client = null;

async function connectRedis() {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    logger.warn("REDIS_URL not set — rate limiting will use in-memory store.");
    return null;
  }

  try {
    // Lazy-require so the app starts without the redis package if unused
    const { createClient } = require("redis");
    client = createClient({ url: redisUrl });
    client.on("error", (err) => logger.error("Redis error:", err));
    await client.connect();
    logger.info("Redis connected.");
    return client;
  } catch (err) {
    logger.warn(`Redis connection failed: ${err.message}. Falling back to in-memory.`);
    return null;
  }
}

function getClient() {
  return client;
}

module.exports = { connectRedis, getClient };
