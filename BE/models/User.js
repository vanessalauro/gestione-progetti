// Definisci lo schema e il modello per la collezione "Utenti"
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  operatore: {
    type: String,
    required: true
  },
  nucleo: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;