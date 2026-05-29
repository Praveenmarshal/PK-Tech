const Admin = require("../models/Admin");

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

module.exports = { getSettings, updateSettings };
