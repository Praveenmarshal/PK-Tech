"use strict";

function validateMessage(body) {
  const errors = [];
  if (!body.message || typeof body.message !== "string") errors.push("message is required");
  else if (body.message.trim().length === 0) errors.push("message cannot be empty");
  else if (body.message.length > 2000) errors.push("message must be 2000 characters or fewer");
  return { valid: errors.length === 0, errors };
}

module.exports = { validateMessage };
