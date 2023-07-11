const mongoose = require("mongoose");

// Operatore
const operatoreSchema = new mongoose.Schema({
  numeroOperatore: {
    type: String,
    required: true
  },
  nomeOperatore: {
    type: String,
    required: true
  }
});

module.exports = operatoreSchema;