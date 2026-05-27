const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "" },
    quote: { type: String, required: true },
    avatar: { url: String, publicId: String },
    status: { type: String, enum: ["Draft", "Published"], default: "Published" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);

