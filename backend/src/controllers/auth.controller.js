"use strict";

const { signToken } = require("../utils/jwt");
const Admin         = require("../models/Admin");
const env           = require("../config/env");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Local-mode (no DB): compare directly with env credentials
    if (!env.isMongoConfigured) {
      const match =
        email?.toLowerCase() === env.ADMIN_EMAIL?.toLowerCase() &&
        password === env.ADMIN_PASSWORD;
      if (!match) return res.status(401).json({ message: "Invalid credentials" });
      return res.json({
        token: signToken({ id: "local-owner", role: "owner" }),
        admin: { id: "local-owner", name: "Admin", email: env.ADMIN_EMAIL, role: "owner" },
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase(), isActive: true });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      token: signToken({ id: admin._id, role: admin.role }),
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res) {
  res.json({ admin: req.admin });
}

module.exports = { login, me };
