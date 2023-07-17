// Definisci lo schema e il modello per la collezione "Utenti"
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
}, { collection: "utenti" });

module.exports = userSchema;