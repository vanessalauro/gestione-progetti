const mongoose = require('mongoose');
const progettoSchema = require('./Progetto');

const documentSchema = new mongoose.Schema({
  progetto: { 
    type: progettoSchema  
  },
  // documentId: { type: String, required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'document' });

module.exports = mongoose.model('Document', documentSchema);
