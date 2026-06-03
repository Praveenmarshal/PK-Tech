const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const controller = require("../controllers/resource.controller");

router.get("/admin", protect, controller.listAdminResources);
router.get("/", controller.listResources);
router.get("/:slug", controller.getResource);
router.post("/", protect, controller.createResource);
router.put("/:id", protect, controller.updateResource);
router.delete("/:id", protect, controller.deleteResource);

module.exports = router;

