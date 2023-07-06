const express = require('express');
const app = express();
const http = require('http');

// const WebSocket = require('ws');
const mongodb = require('mongodb').MongoClient;

const PORT = process.env.PORT || 8080;
const routes = require('./api/controllers/routes');

// Creazione del server WebSocket
// const wss = new WebSocket.Server({ port: 8080 });

// Connessione al database MongoDB
/*mongodb.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });*/

// Connessione al database MongoDB
/*mongodb.connect('mongodb://localhost:27017', (err, client) => {
  if (err) {
    console.error('Errore nella connessione al database:', err);
    return;
  }

  // Ottieni il riferimento al database
  const db = client.db('gestione-progetti');

  // Gestisci la connessione WebSocket
  wss.on('connection', (ws) => {
    console.log('Nuova connessione WebSocket');

    // Gestisci i messaggi ricevuti
    ws.on('message', (message) => {
      console.log('Messaggio ricevuto:', message);

      // Esegui le logiche personalizzate
      // Puoi ad esempio salvare il messaggio nel database MongoDB
      db.collection('nome_collection').insertOne({ message }, (err) => {
        if (err) {
          console.error('Errore durante l\'inserimento nel database:', err);
          return;
        }
        console.log('Messaggio salvato nel database');
      });

      // Invia una risposta al client
      ws.send('Messaggio ricevuto con successo!');
    });

    // Gestisci la chiusura della connessione
    ws.on('close', () => {
      console.log('Connessione WebSocket chiusa');
    });
  });
});*/

// Middleware per il parsing del corpo delle richieste
// Middlewares globali
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Monta le routes
app.use('/', routes);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})
