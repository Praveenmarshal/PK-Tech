const router = require("express").Router();
const { protect } = require("../middleware/auth");
const controller = require("../controllers/resourceController");

router.get("/admin", protect, controller.listAdminResources);
router.get("/", controller.listResources);
router.get("/:slug", controller.getResource);
router.post("/", protect, controller.createResource);
router.put("/:id", protect, controller.updateResource);
router.delete("/:id", protect, controller.deleteResource);

module.exports = router;

