const mongoose = require('mongoose');

const pestDiseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Pest', 'Disease'], required: true },
  cropAffected: { type: String, required: true },
  damageType: { type: String, required: true },
  symptoms: { type: String, default: '' },
  controlMethod: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('PestDisease', pestDiseaseSchema);