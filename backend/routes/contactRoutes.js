const router = require("express").Router();
const { protect } = require("../middleware/auth");
const controller = require("../controllers/contactController");

router.post("/", controller.createMessage);
router.get("/messages", protect, controller.listMessages);
router.put("/messages/:id", protect, controller.updateMessage);

module.exports = router;

