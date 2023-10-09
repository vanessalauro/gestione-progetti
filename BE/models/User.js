// Definisci lo schema e il modello per la collezione "Utenti"
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: {
    type: String
  },
  cognome: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  admin: {
    type: Boolean
  },
  manager: {
    type: Boolean
  }
}, { collection: "utenti" });

module.exports = userSchema;