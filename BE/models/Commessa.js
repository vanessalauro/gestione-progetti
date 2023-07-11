const mongoose = require("mongoose");

// Commessa
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

module.exports = commessaSchema;