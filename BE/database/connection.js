const mongoose = require('mongoose');

// Definisci l'URL di connessione al tuo database MongoDB
const dbURL = 'mongodb://127.0.0.1:27017/gestione-progetti';

// Connetti il tuo server MongoDB
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connessione al database avvenuta con successo'))
    .catch((error) => console.error('Errore durante la connessione al database:', error));



