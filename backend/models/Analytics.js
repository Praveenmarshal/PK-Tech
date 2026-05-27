const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    page: { type: String, default: "" },
    referrer: { type: String, default: "" },
    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analytics", analyticsSchema);

