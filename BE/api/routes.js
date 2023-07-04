const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

// GET /projects
router.get('/projects', projectsController.getAllProjects);

// GET /projects/:id
router.get('/projects/:id', projectsController.getProjectById);

// POST /projects
router.post('/projects', projectsController.createProject);

// PUT /projects/:id
router.put('/projects/:id', projectsController.updateProject);

// DELETE /projects/:id
router.delete('/projects/:id', projectsController.deleteProject);

// POST /api/auth
router.post('/api/auth', AuthController.login);

module.exports = router;
