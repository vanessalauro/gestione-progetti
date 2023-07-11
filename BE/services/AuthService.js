// AuthService.js
const mongoose = require("mongoose");
const User = require("../models/User");


class AuthService {
  constructor() {
    this.userModel = mongoose.model("utenti", User);
  }

  async login(username, password) {
    console.log('username:' , username);
    // const user = await this.userModel.findOne({ "user.username" : username });
    const user = await this.userModel.findOne({ "username": username });
    console.log('user:', user);
    if (user) {
      // Il documento è stato trovato
      console.log('Utente trovato:', user);
      const userFound = {
        id: user.id,
        username: user.username,
        password: user.password,
        operator: user.operator,
        nucleo: user.nucleo,
        team: user.team,
        admin: user.admin
      }
      return userFound;
    } else {
      // Nessun documento trovato
      console.log('Nessun utente trovato');
      return null;
    }
  }
}

module.exports = new AuthService();
