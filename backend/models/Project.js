const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, default: "AI Solution" },
    summary: { type: String, default: "" },
    description: { type: String, default: "" },
    features: [{ type: String }],
    technologies: [{ type: String }],
    screenshots: [{ url: String, publicId: String, alt: String }],
    results: [{ type: String }],
    challenges: [{ type: String }],
    status: { type: String, enum: ["Draft", "Published", "Archived"], default: "Published" },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);

