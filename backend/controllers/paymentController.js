const PaymentProof = require("../models/PaymentProof");
const { uploadBuffer } = require("../services/cloudinaryService");

async function listPayments(req, res, next) {
  try {
    const payments = await PaymentProof.find().sort({ createdAt: -1 });
    res.json({ payments });
  } catch (error) {
    next(error);
  }
}

async function createPayment(req, res, next) {
  try {
    const payment = await PaymentProof.create(req.body);
    res.status(201).json({ payment });
  } catch (error) {
    next(error);
  }
}

async function uploadPaymentProof(req, res, next) {
  try {
    const screenshot = req.file ? await uploadBuffer(req.file, "zilist/payment-proofs") : {};
    const payment = await PaymentProof.create({ ...req.body, screenshot });
    res.status(201).json({ payment });
  } catch (error) {
    next(error);
  }
}

async function deletePayment(req, res, next) {
  try {
    await PaymentProof.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}

module.exports = { listPayments, createPayment, uploadPaymentProof, deletePayment };

