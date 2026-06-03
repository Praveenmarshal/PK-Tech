const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const controller = require("../controllers/payment.controller");

router.get("/", protect, controller.listPayments);
router.post("/", protect, controller.createPayment);
router.post("/upload", protect, upload.single("screenshot"), controller.uploadPaymentProof);
router.delete("/:id", protect, controller.deletePayment);

module.exports = router;

