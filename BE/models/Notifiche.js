// Definisci lo schema e il modello per la collezione "Utenti"
const mongoose = require('mongoose');
const userSchema = require('./User');

const notificheSchema = new mongoose.Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    dataNotifica: {
        type: Date
    },
    operatore:{
        type: userSchema 
    },
    read: {
        type: Boolean
    }
}, { collection: "notifiche" });

module.exports = notificheSchema;