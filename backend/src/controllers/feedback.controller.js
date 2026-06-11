"use strict";
const Feedback = require("../models/Feedback");

/* GET /api/feedback — public, returns all feedbacks newest first */
async function listFeedbacks(req, res, next) {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).lean();
    res.json({ feedbacks });
  } catch (err) {
    next(err);
  }
}

/* POST /api/feedback — public, anyone can submit */
async function createFeedback(req, res, next) {
  try {
    const { email, experience, rating } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ error: "Valid email is required." });
    if (!experience || experience.trim().length < 10)
      return res.status(400).json({ error: "Experience must be at least 10 characters." });
    if (!rating || rating < 1 || rating > 5)
      return res.status(400).json({ error: "Rating must be between 1 and 5." });

    const feedback = await Feedback.create({
      email: email.trim().toLowerCase(),
      experience: experience.trim(),
      rating: Number(rating),
    });

    res.status(201).json({ feedback });
  } catch (err) {
    next(err);
  }
}

/* DELETE /api/feedback/:id — admin only */
async function deleteFeedback(req, res, next) {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { listFeedbacks, createFeedback, deleteFeedback };
