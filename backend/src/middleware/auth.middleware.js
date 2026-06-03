"use strict";

const { verifyToken } = require("../utils/jwt");
const Admin = require("../models/Admin");
const env   = require("../config/env");

async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token  = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Admin token required" });

    const decoded = verifyToken(token);

    // Local-mode fallback (no MongoDB configured)
    if (!env.isMongoConfigured && decoded.id === "local-owner") {
      req.admin = {
        _id: "local-owner",
        name: "Admin",
        email: env.ADMIN_EMAIL,
        role: "owner",
        isActive: true,
      };
      return next();
    }

    const admin = await Admin.findById(decoded.id).select("-passwordHash");
    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: "Admin account not available" });
    }

    req.admin = admin;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired admin token" });
  }
}

module.exports = { protect };
