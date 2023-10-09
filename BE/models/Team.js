const mongoose = require("mongoose");

// Team
const teamSchema = new mongoose.Schema({
  numeroTeam: {
    type: String
  },
  nomeTeam: {
    type: String
  }
}, { collection: "team" });

module.exports = teamSchema;