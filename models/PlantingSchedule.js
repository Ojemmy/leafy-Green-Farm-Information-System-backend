const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  cropName: { type: String, required: true },
  plantingPeriod: { type: String, required: true },
  harvestPeriod: { type: String, required: true },
  weatherRequirement: { type: String, required: true },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('PlantingSchedule', scheduleSchema);