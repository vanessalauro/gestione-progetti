// AuthController.js
const express = require("express");
const AuthService = require("../../services/AuthService");

const router = express.Router();

const authController = {
  async loginUser(req, res) {
    try {
      
      console.log('Richiesta di login ricevuta:', req.body.body); 
      
      const username = JSON.parse(req.body.body).username;
      const password = JSON.parse(req.body.body).password;

      // console.log('username:', JSON.parse(req.body.body).username);
      // console.log('password:', JSON.parse(req.body.body).password);
      const user = await AuthService.login(username, password);
      console.log(user);
      if (user) {
        // Genera il token di accesso per l'utente
        const token = await AuthService.generateAccessToken(user);
  
        console.log('token:', token);
        // Invia il token di accesso come risposta
        return res.status(200).json({ token });
      } else {
        console.log('Credenziali invalide, invia una risposta di errore');
        // Credenziali invalide, invia una risposta di errore
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  
  
    /* authService.login(req.body.username, req.body.password)
    .then((user) => {
      if (user) {
        // Genera il token di accesso per l'utente
        const token = authService.generateAccessToken(user);

        // Invia il token di accesso come risposta
        return res.status(200).json({ token });
      } else {
        // Credenziali invalide, invia una risposta di errore
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });*/
  }
}

module.exports = authController;