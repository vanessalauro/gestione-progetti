const mongoose = require("mongoose");
const User = require("./User");
const Commessa = require("./Commessa");

// Project
const projectSchema = new mongoose.Schema({
  commessa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commessa'
  },
  idIntervento: {
    type: String,
    required: true
  },
  statoIntervento: {
    type: String, 
    enum: ["In Progress", "Completed", "To Be Tested"],
    required: true
  },
  stima: {
    type: String,
    required: true
  },
  effort: {
    type: String,
    required: true
  },
  operatore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  trimestre: {
    type: Number,
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