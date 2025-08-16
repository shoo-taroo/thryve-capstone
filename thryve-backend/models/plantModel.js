const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  healthStatus: { type: String, default: 'Healthy' },
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plant', plantSchema);
