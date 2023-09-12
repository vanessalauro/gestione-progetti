// AuthService.js
const mongoose = require("mongoose");
const User = require("../models/User");


class AuthService {
  constructor() {
    this.userModel = mongoose.model("utenti", User);
  }

  async registerUser(record) {
    // console.log("record: ", record);
    const user = await this.userModel.findOne({ "username": record.username });
    // console.log('user:', user);
    if (user) {
      // console.log('Utente trovato:', user);
      return user;
    } else {
      // Nessun documento trovato
      console.log('Nessun utente trovato');
      const newUser = new this.userModel({
        username: record.username,
        password: record.password,
        nome: record.nome,
        cognome: record.cognome,
        admin: false,
        manager: false
      });
      const userCreated = await newUser.save();
      return userCreated;
    }
  }

  async login(username, password) {
    // console.log('username:' , username);
    // const user = await this.userModel.findOne({ "user.username" : username });
    const user = await this.userModel.findOne({ "username": username });
    // console.log('user:', user);
    if (user) {
      // Il documento è stato trovato
      // console.log('Utente trovato:', user);
      const userFound = {
        nome: user.nome,
        cognome: user.cognome,
        username: user.username,
        password: user.password,
        /*operator: user.operator,
        nucleo: user.nucleo,
        team: user.team,*/
        admin: user.admin,
        manager: user.manager
      }
      return userFound;
    } else {
      // Nessun documento trovato
      // console.log('Nessun utente trovato');
      return null;
    }
  }
}

module.exports = new AuthService();
