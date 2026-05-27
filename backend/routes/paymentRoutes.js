const router = require("express").Router();
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");
const controller = require("../controllers/paymentController");

router.get("/", protect, controller.listPayments);
router.post("/", protect, controller.createPayment);
router.post("/upload", protect, upload.single("screenshot"), controller.uploadPaymentProof);

module.exports = router;

