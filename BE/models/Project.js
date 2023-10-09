const mongoose = require("mongoose");
const userSchema = require("./User");
const commessaSchema = require("./Commessa");

const progettiSchema = new mongoose.Schema({
  descrIntervento: {
    type: String
  },
  trimestre: {
    type: String
  },
  operatore: {
    type: userSchema
  },
  stima: {
    type: Number
  },
  effort: {
    type: Number
  },
  commessa: {
    type: commessaSchema
  },
  statoIntervento: {
    type: String,
    enum: ["Pianificato", "In Lavorazione", "Da Testare", "Completato"]
  },
  inLavorazione: {
    type: Boolean
  },
  dataInizio: {
    type: Date,
    default: Date.now()
  },
  dataFine: {
    type: Date,
    default: Date.now()
  },
  giorniDiAvanzamento: {
    type: Number
  },
  percentualeAvanzamento: {
    type: Number
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
}, { collection: "progetti" });

module.exports = progettiSchema;