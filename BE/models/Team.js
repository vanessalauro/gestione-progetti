const mongoose = require("mongoose");

// Team
const teamSchema = new mongoose.Schema({
  numeroTeam: {
    type: String,
    required: true
  },
  nomeTeam: {
    type: String,
    required: true
  }
});

module.exports = teamSchema;