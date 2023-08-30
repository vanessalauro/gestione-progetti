const mongoose = require("mongoose");
const User = require("./User");
const Commessa = require("./Commessa");

// Project
const projectSchema = new mongoose.Schema({
  idIntervento: {
    type: String,
    required: true,
    unique: true
  },
  descrIntervento: {
    type: String,
    required: true
  },
  trimestre: {
    type: String,
    required: true
  },
  rapportini: [
    {
      idRapportino: {
        type: String,
        required: true
      },
      dataRapportino: {
        type: Date,
        required: true
      },
      descrizioneRapportino: {
        type: String,
        required: true
      }
    }
  ],
  operatore: {
    nome: {
      type: String,
      required: true
    },
    cognome: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    admin: {
      type: Boolean,
      required: true
    },
    manager: {
      type: Boolean,
      required: true
    }
  },
  /*operatore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Riferimento al modello "User"
    required: true
  },*/
  stima: {
    type: String,
    required: true
  },
  effort: {
    type: String,
    required: true
  },
  commessa: {
    numeroCommessa: {
      type: String,
      required: true
    },
    nomeCommessa: {
      type: String,
      required: true
    }
  },
  /*commessa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commessa', // Riferimento al modello "Commessa"
    required: true
  },*/
  statoIntervento: {
    type: String, 
    enum: ["Pianificato", "In Lavorazione", "Da Testare", "Completato"],
    required: true
  },
  inLavorazione: {
    type: Boolean,
    required: true
  },
  dataInizio: {
    type: Date,
    default: Date.now(),
    required: true
  },
  dataFine: {
    type: Date,
    default: Date.now(),
    required: true
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
}, { collection: "progetti" });

module.exports = projectSchema;