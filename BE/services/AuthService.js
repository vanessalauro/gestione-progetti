// AuthService.js

import UserModel from '../models/UserModel';

module.exports = {
  async authenticate(username, password) {
    // Cerca l'utente nel database in base all'username
    const user = await UserModel.findOne({ username });

    if (user && user.comparePassword(password)) {
      // Le credenziali sono valide, restituisci l'utente
      return user;
    } else {
      // Le credenziali sono invalide, restituisci null
      return null;
    }
  },
};
