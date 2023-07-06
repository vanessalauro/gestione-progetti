const express = require('express');
const router = express.Router();

const authController = require('./authController');
const projectController = require('./projectController');

// Route per l'autenticazione
router.post('/api/login', authController.loginUser);
// router.post('/api/register', authController.register);

// Route per i progetti
router.get('/api/projects', projectController.getAllProjects);
router.post('/api/projects', projectController.createProject);
router.get('/api/projects/:id', projectController.getProjectById);
router.put('/api/projects/:id', projectController.updateProject);
router.delete('/api/projects/:id', projectController.deleteProject);

module.exports = router;
