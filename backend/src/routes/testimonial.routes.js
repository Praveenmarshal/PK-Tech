const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const controller = require("../controllers/testimonial.controller");

router.get("/", controller.listTestimonials);
router.post("/", protect, controller.createTestimonial);
router.put("/:id", protect, controller.updateTestimonial);
router.delete("/:id", protect, controller.deleteTestimonial);

module.exports = router;

