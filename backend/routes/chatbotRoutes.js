const router = require("express").Router();
const { protect } = require("../middleware/auth");
const controller = require("../controllers/chatbotController");

router.post("/message", controller.message);
router.get("/conversations", protect, controller.listConversations);
router.post("/knowledge", protect, controller.saveKnowledge);

module.exports = router;

