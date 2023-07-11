const express = require('express');
const ComboService = require('../../services/ComboService');

const router = express.Router();

const comboController = {
    async getAllTeams(req, res) {
        try {
            const teams = await ComboService.getAllTeams();
            if (teams && teams.length > 0) {
                return res.json({ teams });
            } else {
                console.log('Nessun team trovato nel db');
                return res.json({error: 'Errore nel db'});
            }
        } catch (error) {
            console.log(error);
            return;
        }
        /* await comboService.getAllTeams()
            .then((teams) => {
                res.status(200).json(teams);
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });*/
    },
    async getAllNuclei(req, res) {
        try {
            const nuclei = await ComboService.getAllNuclei();
            if (nuclei && nuclei.length > 0) {
                return res.json({ nuclei });
            } else {
                console.log('Nessun nucleo trovato nel db');
                return res.json({error: 'Errore nel db'});
            }
        } catch (error) {
            console.log(error);
            return;
        }
        /*await comboService.getAllNuclei()
            .then((nuclei) => {
                res.status(200).json(nuclei);
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });*/
    },
    async getAllOperatori(req, res) {
        try {
            const operatore = await ComboService.getAllOperatori();
            if (operatore && operatore.length > 0) {
                return res.json({ operatore });
            } else {
                console.log('Nessun operatore trovato nel db');
                return res.json({error: 'Errore nel db'});
            }
        } catch (error) {
            console.log(error);
            return;
        }
        /* await comboService.getAllOperatori()
            .then((operatore) => {
                res.status(200).json(operatore);
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });*/
    },
    async getAllCommesse(req, res) {
        try {
            const commessa = await ComboService.getAllCommesse();
            if (commessa && commessa.length > 0) {
                return res.json({ commessa });
            } else {
                console.log('Nessuna commessa trovata nel db');
                return res.json({error: 'Errore nel db'});
            }
        } catch (error) {
            console.log(error);
            return;
        }
        /* await comboService.getAllCommesse()
            .then((commessa) => {
                res.status(200).json(commessa);
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });*/
    }
}

module.exports = comboController;