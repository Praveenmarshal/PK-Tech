"use strict";

function validateLogin(body) {
  const errors = [];
  if (!body.email || typeof body.email !== "string") errors.push("email is required");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push("email must be a valid address");
  if (!body.password || typeof body.password !== "string") errors.push("password is required");
  else if (body.password.length < 6) errors.push("password must be at least 6 characters");
  return { valid: errors.length === 0, errors };
}

module.exports = { validateLogin };
