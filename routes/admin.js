const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/auth');
const Crop = require('../models/Crop');
const PestDisease = require('../models/PestDisease');
const PlantingSchedule = require('../models/PlantingSchedule');
const User = require('../models/User');

// Crops
router.get('/crops', verifyAdmin, async (req, res) => {
  res.json(await Crop.find().sort({ cropName: 1 }));
});
router.post('/crops', verifyAdmin, async (req, res) => {
  const crop = await new Crop(req.body).save();
  res.status(201).json({ message: 'Crop added.', crop });
});
router.put('/crops/:id', verifyAdmin, async (req, res) => {
  const crop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: 'Crop updated.', crop });
});
router.delete('/crops/:id', verifyAdmin, async (req, res) => {
  await Crop.findByIdAndDelete(req.params.id);
  res.json({ message: 'Crop deleted.' });
});

// Pests/Diseases
router.get('/pest-diseases', verifyAdmin, async (req, res) => {
  res.json(await PestDisease.find().sort({ name: 1 }));
});
router.post('/pest-diseases', verifyAdmin, async (req, res) => {
  const record = await new PestDisease(req.body).save();
  res.status(201).json({ message: 'Record added.', record });
});
router.delete('/pest-diseases/:id', verifyAdmin, async (req, res) => {
  await PestDisease.findByIdAndDelete(req.params.id);
  res.json({ message: 'Record deleted.' });
});

// Planting Schedules
router.get('/planting', verifyAdmin, async (req, res) => {
  res.json(await PlantingSchedule.find().sort({ cropName: 1 }));
});
router.post('/planting', verifyAdmin, async (req, res) => {
  const schedule = await new PlantingSchedule(req.body).save();
  res.status(201).json({ message: 'Schedule added.', schedule });
});
router.delete('/planting/:id', verifyAdmin, async (req, res) => {
  await PlantingSchedule.findByIdAndDelete(req.params.id);
  res.json({ message: 'Schedule deleted.' });
});

// Farmers list
router.get('/farmers', verifyAdmin, async (req, res) => {
  res.json(await User.find({ role: 'farmer' }).select('-password').sort({ createdAt: -1 }));
});

module.exports = router;