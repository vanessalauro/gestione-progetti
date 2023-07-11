const mongoose = require("mongoose");

// Project
const projectSchema = new mongoose.Schema({
  /*commessa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commessa'
  },*/
  idIntervento: {
    type: String,
    required: true
  },
  trimestre: {
    type: Number,
    required: true
  },
  /*team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },*/
  /*nucleo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nucleo'
  },*/
  /*operatore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operatore'
  },*/
  stima: {
    type: String,
    required: true
  },
  effort: {
    type: String,
    required: true
  },
  statoIntervento: {
    type: String, 
    enum: ["In Progress", "Completed", "To Be Tested"],
    required: true
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;