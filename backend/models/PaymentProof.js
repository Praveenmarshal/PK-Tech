const mongoose = require("mongoose");

const paymentProofSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    projectName: { type: String, required: true },
    amount: { type: String, default: "" },
    screenshot: { url: String, publicId: String },
    status: { type: String, enum: ["Uploaded", "Verified", "Archived"], default: "Uploaded" },
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentProof", paymentProofSchema);

