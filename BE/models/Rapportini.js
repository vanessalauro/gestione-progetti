const mongoose = require("mongoose");
const commessaSchema = require("./Commessa");

// Project
const rapportiniSchema = new mongoose.Schema({
    progressivo: {
        type: String,
        unique: true
    },
    idProgetto: {
        type: String
    },
    commessa: {
        type: commessaSchema
    },
    operatore: {
        type: String
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