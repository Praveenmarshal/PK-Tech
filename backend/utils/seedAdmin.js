const Admin = require("../models/Admin");

async function seedAdmin() {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.includes("replace-with")) {
    console.warn("Default admin not seeded. Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env.");
    return;
  }

  const passwordHash = await Admin.hashPassword(process.env.ADMIN_PASSWORD);
  const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL.toLowerCase() });
  if (existing) {
    existing.passwordHash = passwordHash;
    existing.isActive = true;
    existing.role = "owner";
    await existing.save();
    console.log("ZILIST admin credentials updated.");
    return;
  }

  await Admin.create({
    name: "Praveen Kannan",
    email: process.env.ADMIN_EMAIL.toLowerCase(),
    passwordHash
  });
  console.log("Default ZILIST admin seeded.");
}

module.exports = { seedAdmin };
