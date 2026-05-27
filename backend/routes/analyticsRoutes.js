const router = require("express").Router();
const { protect } = require("../middleware/auth");
const controller = require("../controllers/analyticsController");

router.post("/event", controller.recordEvent);
router.get("/summary", protect, controller.summary);

module.exports = router;

