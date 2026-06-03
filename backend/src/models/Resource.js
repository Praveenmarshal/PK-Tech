const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, default: "Articles" },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    tags: [{ type: String }],
    image: { url: String, publicId: String, alt: String },
    status: { type: String, enum: ["Draft", "Published", "Archived"], default: "Published" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);

