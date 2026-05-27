const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

function signToken(admin) {
  return jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
}

function mongoConfigured() {
  return process.env.MONGODB_URI && !process.env.MONGODB_URI.includes("<username>");
}

function localOwnerLogin(email, password) {
  return email?.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase() && password === process.env.ADMIN_PASSWORD;
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (!mongoConfigured() && localOwnerLogin(email, password)) {
      return res.json({
        token: jwt.sign({ id: "local-owner", role: "owner" }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN || "7d"
        }),
        admin: { id: "local-owner", name: "Praveen Kannan", email: process.env.ADMIN_EMAIL, role: "owner" }
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase(), isActive: true });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid private admin credentials" });
    }

    res.json({
      token: signToken(admin),
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role }
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res) {
  res.json({ admin: req.admin });
}

module.exports = { login, me };
