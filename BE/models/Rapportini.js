const mongoose = require("mongoose");

// Project
const rapportiniSchema = new mongoose.Schema({
    idRapportino: {
        type: String,
        required: true
    },
    operatore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Riferimento al modello "User"
        required: true
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