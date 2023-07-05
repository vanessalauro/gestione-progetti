const mongoose = require("mongoose");

const commessaSchema = new mongoose.Schema({
  numeroCommessa: {
    type: String,
    required: true
  },
  nomeCommessa: {
    type: String,
    required: true
  }
});

const Commessa = mongoose.model('Commessa', commessaSchema);

module.exports = Commessa;

const projectSchema = new mongoose.Schema({
  commessa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commessa'
  },
  idIntervento: {
    type: String,
    required: true
  },
  trimestre: {
    type: Number,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  nucleo: {
    type: String,
    required: true
  },
  operatore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operatore'
  },
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