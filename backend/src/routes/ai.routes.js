"use strict";

const router            = require("express").Router();
const controller        = require("../controllers/ai.controller");
const { protect }       = require("../middleware/auth.middleware");
const { chatLimiter }   = require("../middleware/rateLimit.middleware");
const { validate }      = require("../middleware/validation.middleware");
const { validateMessage } = require("../validators/ai.validator");

router.post("/message",          chatLimiter, validate(validateMessage), controller.message);
router.get("/conversations",     protect, controller.listConversations);
router.get("/knowledge",         protect, controller.listKnowledge);
router.post("/knowledge",        protect, controller.saveKnowledge);
router.delete("/knowledge/:id",  protect, controller.deleteKnowledge);

module.exports = router;
