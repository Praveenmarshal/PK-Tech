const AIConversation = require("../models/AIConversation");
const { askAssistant } = require("../services/aiService");

async function message(req, res, next) {
  try {
    const userMessage = req.body.message || "";
    const answer = await askAssistant(userMessage);
    AIConversation.create({
      kind: "conversation",
      page: req.body.page || "",
      provider: answer.provider,
      messages: [
        { role: "user", content: userMessage },
        { role: "assistant", content: answer.reply }
      ]
    }).catch(() => {});
    res.json({ reply: answer.reply, provider: answer.provider });
  } catch (error) {
    next(error);
  }
}

async function saveKnowledge(req, res, next) {
  try {
    const item = await AIConversation.create({
      kind: "knowledge",
      intent: req.body.intent,
      answer: req.body.answer,
      messages: [{ role: "system", content: `${req.body.intent}: ${req.body.answer}` }]
    });
    res.status(201).json({ knowledge: item });
  } catch (error) {
    next(error);
  }
}

async function listConversations(req, res, next) {
  try {
    const conversations = await AIConversation.find().sort({ createdAt: -1 }).limit(100);
    res.json({ conversations });
  } catch (error) {
    next(error);
  }
}

async function listKnowledge(req, res, next) {
  try {
    const knowledge = await AIConversation.find({ kind: "knowledge" }).sort({ createdAt: -1 });
    res.json({ knowledge });
  } catch (error) {
    next(error);
  }
}

async function deleteKnowledge(req, res, next) {
  try {
    await AIConversation.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

module.exports = { message, saveKnowledge, listKnowledge, deleteKnowledge, listConversations };

