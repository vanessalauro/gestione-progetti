const mongoose = require("mongoose");

// Nucleo
const nucleoSchema = new mongoose.Schema({
  numeroNucleo: {
    type: String,
    required: true
  },
  nomeNucleo: {
    type: String,
    required: true
  }
});


module.exports = nucleoSchema;