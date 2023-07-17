const express = require('express');
const ComboService = require('../../services/ComboService');

const router = express.Router();

const comboController = {
    async getAllTeams(req, res) {
        try {
            const teams = await ComboService.getAllTeams();
            if (teams && teams.length > 0) {
                // console.log(teams);
                return res.json({teams: teams});
            } else {
                console.log('Nessun team trovato nel db');
                return res.json({error: 'Errore nel db'});
            }
        } catch (error) {
            console.log(error);
            return;
        }
    },
    async getAllNuclei(req, res) {
        try {
            const nuclei = await ComboService.getAllNuclei();
            if (nuclei && nuclei.length > 0) {
                // console.log(nuclei);
                return res.json({nuclei: nuclei});
            } else {
                console.log('Nessun nucleo trovato nel db');
                return res.json({error: 'Errore nel db'});
            }
        } catch (error) {
            console.log(error);
            return;
        }
    },
    async getAllOperatori(req, res) {
        try {
            const operatore = await ComboService.getAllOperatori();
            if (operatore && operatore.length > 0) {
                // console.log(operatore);
                return res.json({operatore: operatore});
            } else {
                console.log('Nessun operatore trovato nel db');
                return res.json({error: 'Errore nel db'});
            }
        } catch (error) {
            console.log(error);
            return;
        }
    },
    async getAllCommesse(req, res) {
        try {
            const commessa = await ComboService.getAllCommesse();
            if (commessa && commessa.length > 0) {
                // console.log(commessa);
                return res.json({commessa: commessa});
            } else {
                console.log('Nessuna commessa trovata nel db');
                return res.json({error: 'Errore nel db'});
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }
}

module.exports = comboController;