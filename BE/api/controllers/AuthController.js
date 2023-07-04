// AuthController.js

import AuthService from '../services/AuthService';

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;

    try {
      // Verifica le credenziali dell'utente utilizzando il servizio AuthService
      const user = await AuthService.authenticate(username, password);

      if (user) {
        // Genera il token di accesso per l'utente
        const token = AuthService.generateAccessToken(user);

        // Invia il token di accesso come risposta
        return res.status(200).json({ token });
      } else {
        // Credenziali invalide, invia una risposta di errore
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      // Gestisci eventuali errori
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
