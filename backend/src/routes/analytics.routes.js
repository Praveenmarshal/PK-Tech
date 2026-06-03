const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const controller = require("../controllers/analytics.controller");

router.post("/event", controller.recordEvent);
router.get("/summary", protect, controller.summary);

module.exports = router;

