const router = require("express").Router();
const { protect } = require("../middleware/auth");
const controller = require("../controllers/chatbotController");

router.post("/message", controller.message);
router.get("/conversations", protect, controller.listConversations);
router.get("/knowledge", protect, controller.listKnowledge);
router.post("/knowledge", protect, controller.saveKnowledge);
router.delete("/knowledge/:id", protect, controller.deleteKnowledge);

module.exports = router;

