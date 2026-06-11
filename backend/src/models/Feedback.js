const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    email:      { type: String, required: true, trim: true, lowercase: true },
    experience: { type: String, required: true, minlength: 10, maxlength: 600 },
    rating:     { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
