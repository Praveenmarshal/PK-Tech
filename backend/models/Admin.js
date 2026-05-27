const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Praveen Kannan" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["owner"], default: "owner" },
    isActive: { type: Boolean, default: true },
    settings: {
      brandName: { type: String, default: "ZILIST" },
      phone: { type: String, default: "+91 8825870266" },
      portfolio: { type: String, default: "https://praveen-kannan-4607.vercel.app/" },
      linkedin: { type: String, default: "https://www.linkedin.com/in/praveen-kannan-6862382a2" },
      github: { type: String, default: "https://github.com/Praveenmarshal" }
    }
  },
  { timestamps: true }
);

adminSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

adminSchema.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hash(password, 12);
};

module.exports = mongoose.model("Admin", adminSchema);

