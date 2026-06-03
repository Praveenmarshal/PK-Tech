const ContactMessage = require("../models/ContactMessage");
const { sendContactNotification } = require("../services/email.service");

async function createMessage(req, res, next) {
  try {
    const message = await ContactMessage.create(req.body);
    await sendContactNotification(message);
    res.status(201).json({ message: "Message received", contactMessage: message });
  } catch (error) {
    next(error);
  }
}

async function listMessages(req, res, next) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ messages });
  } catch (error) {
    next(error);
  }
}

async function updateMessage(req, res, next) {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ message });
  } catch (error) {
    next(error);
  }
}

async function deleteMessage(req, res, next) {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

module.exports = { createMessage, listMessages, updateMessage, deleteMessage };

