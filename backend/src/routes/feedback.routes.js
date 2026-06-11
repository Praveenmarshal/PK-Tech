"use strict";
const router     = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const ctrl       = require("../controllers/feedback.controller");

router.get("/",       ctrl.listFeedbacks);   // public
router.post("/",      ctrl.createFeedback);  // public
router.delete("/:id", protect, ctrl.deleteFeedback); // admin only

module.exports = router;
