const express = require("express");
const NotificheService = require("../../services/NotificheService");

const router = express.Router();

const notificheController = {
    async getNotifiche(req, res) {
        try {
            const notifiche = await NotificheService.getNotifiche();
            if (notifiche && notifiche.length > 0) {
                return res.json({ notifiche: notifiche });
            } else {
                console.log("Nessuna notifica trovata nel db");
                return res.json({ error: "Errore nel db" });
            }
        } catch (error) {
            console.log(error);
            return;
        }
    },
    async getNotificheDaLeggere(req, res) {
        try {
            const notificheNumber = await NotificheService.getNotificheDaLeggere();
            return res.json({ notificheDaLeggere: notificheNumber });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = notificheController;