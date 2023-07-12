const authController = require('../api/controllers/AuthController');
const projectController = require('../api/controllers/projectController');
const comboController = require('../api/controllers/comboController');
const express = require('express');
const router = express.Router();

// login
router.route('/login')
    .post((req, res) => authController.loginUser(req, res));

// projects
router.route('/project')
    .get((req, res) => projectController.getAllProjects(req, res))
    .post((req, res) => projectController.createProject(req, res));
router.route('/project/:id')
    .get((req, res) => projectController.getProjectById(req, res))
    .put((req, res) => projectController.createProject(req, res))
    .delete((req, res) => projectController.deleteProject(req, res))
    .post((req, res) => projectController.updateProject(req, res));

// combo
router.route('/team')
    .get((req, res) => comboController.getAllTeams(req, res));

router.route('/nucleo')
    .get((req, res) => comboController.getAllNuclei(req, res));

router.route('/operatore')
    .get((req, res) => comboController.getAllOperatori(req, res));
    
router.route('/commessa')
    .get((req, res) => comboController.getAllCommesse(req, res));

module.exports = router;