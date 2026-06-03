"use strict";

/**
 * admin.middleware.js — role-based access guard.
 * Must be used AFTER auth.middleware.js protect().
 *
 * Usage:
 *   router.delete("/:id", protect, requireRole("owner"), controller.delete);
 */

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
}

module.exports = { requireRole };
