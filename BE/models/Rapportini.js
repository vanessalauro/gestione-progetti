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
        type: Date
    },
    descrizioneRapportino: {
        type: String
    },
    oreRapportino: {
        type: Number
    },
    minutiRapportino: {
        type: Number
    }
}, { collection: "rapportini" }); 

module.exports = rapportiniSchema;