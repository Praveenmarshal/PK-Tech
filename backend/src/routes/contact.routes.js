const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const controller = require("../controllers/contact.controller");

router.post("/", controller.createMessage);
router.get("/messages", protect, controller.listMessages);
router.put("/messages/:id", protect, controller.updateMessage);
router.delete("/messages/:id", protect, controller.deleteMessage);

module.exports = router;

