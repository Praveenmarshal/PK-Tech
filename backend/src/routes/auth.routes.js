"use strict";

const router               = require("express").Router();
const controller           = require("../controllers/auth.controller");
const { protect }          = require("../middleware/auth.middleware");
const { authLimiter }      = require("../middleware/rateLimit.middleware");
const { validate }         = require("../middleware/validation.middleware");
const { validateLogin }    = require("../validators/auth.validator");

router.post("/login", authLimiter, validate(validateLogin), controller.login);
router.get("/me",    protect, controller.me);

module.exports = router;
