// AuthService.js
const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require('jsonwebtoken');


class AuthService {
  constructor() {
    this.userModel = mongoose.model("users", User);
  }

  async login(username, password) {
    console.log(username);
    const user = await this.userModel.findOne({ username });
    
    if (user && user.comparePassword(password)) {
      // Le credenziali sono valide, restituisci l'utente
      return user;
    } else {
      // Le credenziali sono invalide, restituisci null
      return null;
    }
  }

  static generateAccessToken(user) {

    const generateToken = (payload, secret, expiresIn) => {
      return jwt.sign(payload, secret, { expiresIn });
    };
    
    const secret = 'projectmanagement2023';
    const token = generateToken(user, secret, '1h');

    return token;
  }
}

module.exports = new AuthService();
