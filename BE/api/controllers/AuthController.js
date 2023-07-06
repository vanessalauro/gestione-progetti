// AuthController.js
const express = require("express");
const authService = require("../../services/AuthService");

const router = express.Router();

const authController = {
  async loginUser(req, res) {
    try {
      const user = await authService.login(req.body.username, req.body.password);
      if (user) {
        // Genera il token di accesso per l'utente
        const token = authService.generateAccessToken(user);
  
        // Invia il token di accesso come risposta
        return res.status(200).json({ token });
      } else {
        // Credenziali invalide, invia una risposta di errore
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
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