const authController = require('../api/controllers/AuthController');
const projectController = require('../api/controllers/projectController');
const comboController = require('../api/controllers/comboController');
const notificheController = require('../api/controllers/notificheController');
const express = require('express');
const session = require("express-session");
const router = express.Router();

router.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true
}));

// login
router.route('/login')
    .post((req, res) => authController.loginUser(req, res));
router.route('/register')
    .post((req, res) => authController.registerUser(req, res));
router.route('/logout')
    .post((req, res) => authController.logoutUser(req, res));

// projects
router.route('/project')
    .get((req, res) => projectController.getProjectsByParams(req, res))
    .post((req, res) => projectController.updateProject(req, res))
    .put((req, res) => projectController.createProject(req, res));  
    // .delete((req, res) => projectController.deleteProject(req, res));
router.route('/project/update_lavorazione')
    .post((req, res) => projectController.updateLavorazione(req, res));
router.route('/project/delete_project')
    .post((req, res) => projectController.deleteProject(req, res));
router.route('/project/chiudere_intervento')
    .post((req, res) => projectController.closeIntervento(req, res));

// rapportini
router.route('/nuovoRapportino')
    .put((req, res) => projectController.nuovoRapportino(req, res));
router.route('/rapportini')
    .get((req, res) => projectController.getRapportini(req, res));
router.route('/editRapportino')
    .post((req, res) => projectController.updateRapportino(req, res));

// combo
router.route('/team')
    .get((req, res) => comboController.getAllTeams(req, res));

router.route('/nucleo')
    .get((req, res) => comboController.getAllNuclei(req, res));

router.route('/operatore')
    .get((req, res) => comboController.getAllOperatori(req, res));

router.route('/commessa')
    .get((req, res) => comboController.getAllCommesse(req, res));

// notifiche
router.route('/caricaNotifiche')
    .get((req, res) => notificheController.getNotifiche(req, res));
router.route('/notificheDaLeggere')
    .get((req, res) => notificheController.getNotificheDaLeggere(req, res));

module.exports = router;