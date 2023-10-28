// AuthController.js
const express = require("express");
const AuthService = require("../../services/AuthService");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'projectmanagment2023!';

const router = express.Router();

const authController = {
  async registerUser(req, res) {
    try {
      const body = JSON.parse(req.body.body);
      // console.log('body:', req.body.body);
      const user = await AuthService.registerUser(body);

      if (user) {
        // res.redirect("/login");
        return res.json({ user });
      } else {
        console.log("Credenziali invalide, invia una risposta di errore");
        return res.json({ error: "Credenziali invalide" });
      }
    } catch (error) {
      console.log(error);
      return;
    }
  },
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
        // res.redirect("/dashboard");
        // console.log('token:', token);
        // Invia il token di accesso come risposta
        return res.json({ token });
      } else {
        console.log('Credenziali invalide, invia una risposta di errore');
        // Credenziali invalide, invia una risposta di errore
        return res.json({ error: "Credenziali invalide" });
      }
    } catch (error) {
      console.log(error);
      return;
    }

  },
  generateAccessToken(user) {

    const generateToken = (payload, secret, expiresIn) => {
      return jwt.sign(payload, secret, { expiresIn: expiresIn });
    };

    const token = generateToken(user, JWT_SECRET, '1h');

    return token;
  },
  async logoutUser(req, res) {
    // Ottieni il token di accesso dall'header della richiesta
   //  console.log(req.body.authorization);
    const token = req.body.authorization.split('Bearer ')[1];

    // Verifica il token di accesso
    const decodedToken = this.verifyToken(token);

    // Elimina i dati di sessione dell'utente dal server
    req.session.destroy();

    // Rimuovi il token di accesso dall'header della risposta
    res.setHeader('Authorization', '');

    // Ritorna un messaggio di successo
    res.send({
      message: 'Logout riuscito'
    });
  },

  async verifyToken(token) {
  
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      return decodedToken;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        // Il token JWT non è valido
        throw new Error('Invalid token');
      } else {
        // Errore imprevisto
        throw error;
      }
    }
  }
}

module.exports = authController;