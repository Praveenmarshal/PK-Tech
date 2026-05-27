const mongoose = require("mongoose");

const aiConversationSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ["conversation", "knowledge"], default: "conversation" },
    page: { type: String, default: "" },
    intent: { type: String, default: "" },
    answer: { type: String, default: "" },
    messages: [
      {
        role: { type: String, enum: ["user", "assistant", "system"], required: true },
        content: { type: String, required: true }
      }
    ],
    provider: { type: String, default: "local" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIConversation", aiConversationSchema);

