const Admin = require("../models/Admin");

/* GET /api/settings/public — no auth, returns stats for about page */
async function getPublicStats(req, res, next) {
  try {
    const admin = await Admin.findOne().select("settings.stats").lean();
    const stats = admin?.settings?.stats || {
      clients:  { value: "500+", label: "Clients"  },
      projects: { value: "350+", label: "Projects" },
      years:    { value: "5+",   label: "Years"    },
      support:  { value: "24/7", label: "Support"  }
    };
    res.json({ stats });
  } catch (err) {
    next(err);
  }
}

async function getSettings(req, res) {
  res.json({ settings: req.admin.settings });
}

async function updateSettings(req, res, next) {
  try {
    const currentSettings = typeof req.admin.settings?.toObject === "function" ? req.admin.settings.toObject() : req.admin.settings || {};
    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      { $set: { settings: { ...currentSettings, ...req.body } } },
      { new: true, runValidators: true }
    ).select("-passwordHash");
    res.json({ settings: admin.settings });
  } catch (error) {
    next(error);
  }
}

module.exports = { getPublicStats, getSettings, updateSettings };
