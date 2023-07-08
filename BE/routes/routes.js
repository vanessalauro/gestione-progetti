const authController = require('../api/controllers/authController');
const projectController = require('../api/controllers/projectController');
const express = require('express');
const router = express.Router();

// login
router.route('/login')
    .post((req, res) => authController.loginUser(req, res));

router.route('/projects')
    .get((req, res) => projectController.getAllProjects(req, res))
    .post((req, res) => projectController.createProject(req, res));

router.route('/projects/:id')
    .get((req, res) => projectController.getProjectById(req, res))
    .put((req, res) => projectController.createProject(req, res))
    .delete((req, res) => projectController.deleteProject(req, res))
    .post((req, res) => projectController.updateProject(req, res));

module.exports = router;