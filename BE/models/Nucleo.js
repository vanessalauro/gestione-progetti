const mongoose = require("mongoose");

// Nucleo
const nucleoSchema = new mongoose.Schema({
  numeroNucleo: {
    type: String
  },
  nomeNucleo: {
    type: String
  }
}, { collection: "nuclei" });


module.exports = nucleoSchema;