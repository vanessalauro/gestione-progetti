const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/AuthMiddleware");
const ProjectController = require("../controllers/ProjectController");

router.use(AuthMiddleware);

router.get("/projects", ProjectController.getProjects);
router.post("/projects", ProjectController.createProject);
router.put("/projects/:id", ProjectController.updateProject);
router.delete("/projects/:id", ProjectController.deleteProject);

module.exports = router;