const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  cropName: { type: String, required: true },
  growthDuration: { type: String, required: true },
  optimalTemperature: { type: String, default: '' },
  waterRequirement: { type: String, default: '' },
  plantingPeriod: { type: String, default: '' },
  harvestPeriod: { type: String, default: '' },
  weatherRequirement: { type: String, default: '' },
  commonDiseases: { type: String, default: '' },
  commonPests: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);