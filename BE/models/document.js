const mongoose = require('mongoose');
const progettoSchema = require('./Progetto');

const documentSchema = new mongoose.Schema({
  progetto: { 
    type: progettoSchema  
  },
  name: { type: String },
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'document' });

module.exports = mongoose.model('Document', documentSchema);
