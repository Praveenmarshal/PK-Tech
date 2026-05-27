const ContactMessage = require("../models/ContactMessage");
const sendEmail = require("../utils/sendEmail");

async function createMessage(req, res, next) {
  try {
    const message = await ContactMessage.create(req.body);
    await sendEmail({
      subject: `ZILIST inquiry: ${message.subject}`,
      text: `${message.name} (${message.email}) wrote:\n\n${message.message}`,
      html: `<h2>ZILIST inquiry</h2><p><strong>Name:</strong> ${message.name}</p><p><strong>Email:</strong> ${message.email}</p><p><strong>Subject:</strong> ${message.subject}</p><p>${message.message}</p>`
    });
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

module.exports = { createMessage, listMessages, updateMessage };

