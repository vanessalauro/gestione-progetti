const mongoose = require('mongoose');
const Project = require('../models/Project');
const Document = require('../models/document');
const User = require('../models/User');

// Definisci l'URL di connessione al tuo database MongoDB
const dbURL = 'mongodb://localhost:27017/gestione-progetti';

// Connetti il tuo server MongoDB
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connessione al database avvenuta con successo'))
    .catch((error) => console.error('Errore durante la connessione al database:', error));



