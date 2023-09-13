const mongoose = require("mongoose");
const userSchema = require("./User");
const progettoSchema = require("./Commessa");

// Project
const rapportiniSchema = new mongoose.Schema({
    progetto: {
        type: progettoSchema
    },
    operatore: {
        type: userSchema
    },
    dataRapportino: {
        type: Date,
        required: true
    },
    descrizioneRapportino: {
        type: String,
        required: true
    },
    oreRapportino: {
        type: Number,
        required: true
    },
    minutiRapportino: {
        type: Number,
        required: true
    }
}, { collection: "rapportini" }); 

module.exports = rapportiniSchema;