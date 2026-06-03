"use strict";

const AIConversation        = require("../models/AIConversation");
const { askOpenAI }         = require("../services/openai.service");
const { localKnowledgeAnswer } = require("../services/knowledgeBase.service");
const env                   = require("../config/env");
const logger                = require("../utils/logger");

async function askAssistant(message) {
  // Try Gemini as fallback if OpenAI fails
  try {
    const reply = await askOpenAI(message);
    if (reply) return { reply, provider: "openai" };
  } catch (err) {
    logger.warn(`OpenAI failed: ${err.message}`);
  }

  if (env.GEMINI_API_KEY) {
    try {
      const model = env.GEMINI_MODEL;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: message }] }],
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) return { reply, provider: "gemini" };
      }
    } catch (err) {
      logger.warn(`Gemini failed: ${err.message}`);
    }
  }

  return { reply: localKnowledgeAnswer(message), provider: "local" };
}

async function message(req, res, next) {
  try {
    const userMessage = req.body.message || "";
    const answer = await askAssistant(userMessage);
    AIConversation.create({
      kind: "conversation",
      page: req.body.page || "",
      provider: answer.provider,
      messages: [
        { role: "user",      content: userMessage },
        { role: "assistant", content: answer.reply },
      ],
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
      messages: [{ role: "system", content: `${req.body.intent}: ${req.body.answer}` }],
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
