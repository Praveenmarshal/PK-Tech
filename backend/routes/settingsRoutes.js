const router = require("express").Router();
const { protect } = require("../middleware/auth");
const controller = require("../controllers/settingsController");

router.get("/", protect, controller.getSettings);
router.put("/", protect, controller.updateSettings);

module.exports = router;

