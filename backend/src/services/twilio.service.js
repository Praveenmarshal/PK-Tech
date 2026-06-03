"use strict";

/**
 * twilio.service.js — SMS / WhatsApp notifications via Twilio.
 * Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM to .env to activate.
 */

const logger = require("../utils/logger");

function isConfigured() {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_FROM
  );
}

async function sendSMS({ to, body }) {
  if (!isConfigured()) {
    logger.info(`Twilio SMS skipped (not configured): ${body}`);
    return { skipped: true };
  }

  // Lazy-require so app starts without the twilio package
  const twilio = require("twilio");
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  return client.messages.create({ to, from: process.env.TWILIO_FROM, body });
}

module.exports = { sendSMS };
