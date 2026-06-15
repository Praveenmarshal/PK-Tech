const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const controller = require("../controllers/settings.controller");

router.get("/public", controller.getPublicStats); // public — no auth needed
router.get("/", protect, controller.getSettings);
router.put("/", protect, controller.updateSettings);

module.exports = router;

