const mongoose = require("mongoose");

// Commessa
const commessaSchema = new mongoose.Schema({
  numeroCommessa: {
    type: String
  },
  nomeCommessa: {
    type: String
  }
}, { collection : "commessa" });

module.exports = commessaSchema;