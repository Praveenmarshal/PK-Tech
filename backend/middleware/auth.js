const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ message: "Admin token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const mongoConfigured = process.env.MONGODB_URI && !process.env.MONGODB_URI.includes("<username>");
    if (!mongoConfigured && decoded.id === "local-owner") {
      req.admin = {
        _id: "local-owner",
        name: "Praveen Kannan",
        email: process.env.ADMIN_EMAIL,
        role: "owner",
        isActive: true,
        settings: {
          brandName: "ZILIST",
          phone: "+91 8825870266",
          portfolio: "https://praveen-kannan-4607.vercel.app/",
          linkedin: "https://www.linkedin.com/in/praveen-kannan-6862382a2",
          github: "https://github.com/Praveenmarshal"
        }
      };
      return next();
    }

    const admin = await Admin.findById(decoded.id).select("-passwordHash");
    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: "Admin account not available" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired admin token" });
  }
}

module.exports = { protect };
