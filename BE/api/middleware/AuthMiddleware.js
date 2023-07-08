const jwt = require('jsonwebtoken');
const config = require('../config'); // Importa il file di configurazione

const dbConfig = config.db;
console.log(`Connettendosi a ${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`);

const appConfig = config.app;
console.log(`L'applicazione è in ascolto sulla porta ${appConfig.port}`);

function authenticate(req, res, next) {
  const token = req.header('Authorization');

  // Verifica se il token è presente nell'header
  if (!token) {
    return res.status(401).json({ message: 'Missing authentication token' });
  }

  try {
    // Verifica e decodifica il token
    const decoded = jwt.verify(token, config.secretKey);

    // Aggiunge l'ID dell'utente autenticato all'oggetto della richiesta
    req.userId = decoded.id;

    // Procedi all'esecuzione della successiva funzione di middleware o route
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid authentication token' });
  }
}

module.exports = authenticate;
