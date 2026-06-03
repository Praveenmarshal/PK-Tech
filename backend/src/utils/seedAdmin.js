"use strict";

const Admin  = require("../models/Admin");
const env    = require("../config/env");
const logger = require("./logger");

async function seedAdmin() {
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD || env.ADMIN_PASSWORD.includes("replace-with")) {
    logger.warn("Default admin not seeded. Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env.");
    return;
  }

  const passwordHash = await Admin.hashPassword(env.ADMIN_PASSWORD);
  const existing = await Admin.findOne({ email: env.ADMIN_EMAIL.toLowerCase() });

  if (existing) {
    existing.passwordHash = passwordHash;
    existing.isActive = true;
    existing.role = "owner";
    await existing.save();
    logger.info("ZILIST admin credentials updated.");
    return;
  }

  await Admin.create({
    name: "Admin",
    email: env.ADMIN_EMAIL.toLowerCase(),
    passwordHash,
  });
  logger.info("Default ZILIST admin seeded.");
}

module.exports = { seedAdmin };
