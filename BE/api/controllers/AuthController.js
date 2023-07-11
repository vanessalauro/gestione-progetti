// AuthController.js
const express = require("express");
const AuthService = require("../../services/AuthService");
const jwt = require('jsonwebtoken');

const router = express.Router();

const authController = {
  async loginUser(req, res) {
    try {
      // const username = req.body.body.username;
      // console.log('username loginUser:', username);
      // const password = req.body.body.password;
      // console.log('password loginUser:', password);
      const body = JSON.parse(req.body.body);
      const username = body["username"];
      const password = body["password"];
      // console.log('username:', username);
      // console.log('password:', password);
      const user = await AuthService.login(username, password);

      // console.log('user AuthService:', user);
      if (user) {
        // Genera il token di accesso per l'utente
        const token = this.generateAccessToken(user);

        // console.log('token:', token);
        // Invia il token di accesso come risposta
        return res.json({token});
      } else {
        console.log('Credenziali invalide, invia una risposta di errore');
        // Credenziali invalide, invia una risposta di errore
        return res.json({error: "Credenziali invalide"});
      }
    } catch (error) {
      console.log(error);
      return;
    }

  },
  generateAccessToken(user) {

    const generateToken = (payload, secret, expiresIn) => {
      return jwt.sign(payload, secret, {expiresIn : expiresIn} );
    };

    const secret = 'projectmanagement2023';
    const token = generateToken(user, secret, '1h');

    return token;
  }
}

module.exports = authController;