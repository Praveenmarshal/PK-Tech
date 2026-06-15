"use strict";

const env    = require("../config/env");
const logger = require("../utils/logger");

function systemPrompt() {
  return [
    "You are PK Tech AI Assistant.",
    "Answer only about PK Tech, Praveen Kannan, services, projects, technologies, contact details, and website navigation.",
    "Be concise, premium, calm, and helpful.",
  ].join(" ");
}

async function askOpenAI(message) {
  if (!env.OPENAI_API_KEY) return null;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL,
      messages: [
        { role: "system", content: systemPrompt() },
        { role: "user",   content: message },
      ],
      temperature: 0.35,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    logger.warn(`OpenAI error: ${response.status} ${err}`);
    throw new Error("OpenAI provider failed");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || null;
}

module.exports = { askOpenAI };
