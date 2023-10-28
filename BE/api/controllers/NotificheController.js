const express = require("express");
const NotificheService = require("../../services/NotificheService");

const router = express.Router();

const notificheController = {
    async getNotifiche(req, res) {
        try {
            const notifiche = await NotificheService.getNotifiche();
            if (notifiche && notifiche.length > 0) {
                console.log('Ricerca notifiche avvenuta con successo')
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
    async getNotificheCount(req, res) {
        try {
            const notificheNumber = await NotificheService.getNotificheCount();
            return res.json({ count: notificheNumber });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = notificheController;