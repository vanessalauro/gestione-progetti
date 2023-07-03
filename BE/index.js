const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongodb = require('mongodb').MongoClient;

const PORT = process.env.PORT || 3000;

// Connessione al database MongoDB
mongodb.connect('mongodb://localhost:27017/gestione-progetti', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware per il parsing del corpo delle richieste
// Middlewares globali
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares locali
app.use('/api/projects', require('./routes/projects'));

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
