const Testimonial = require("../models/Testimonial");

async function listTestimonials(req, res, next) {
  try {
    const testimonials = await Testimonial.find({ status: "Published" }).sort({ createdAt: -1 });
    res.json({ testimonials });
  } catch (error) {
    next(error);
  }
}

async function createTestimonial(req, res, next) {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ testimonial });
  } catch (error) {
    next(error);
  }
}

async function updateTestimonial(req, res, next) {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ testimonial });
  } catch (error) {
    next(error);
  }
}

async function deleteTestimonial(req, res, next) {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
}

module.exports = { listTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };

