const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const controller = require("../controllers/project.controller");

router.get("/admin", protect, controller.listAdminProjects);
router.get("/", controller.listProjects);
router.get("/:slug", controller.getProject);
router.post("/", protect, controller.createProject);
router.put("/:id", protect, controller.updateProject);
router.delete("/:id", protect, controller.deleteProject);

module.exports = router;

