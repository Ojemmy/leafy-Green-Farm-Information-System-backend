const express = require('express');
const router = express.Router();
const PlantingSchedule = require('../models/PlantingSchedule');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, async (req, res) => {
  try {
    res.json(await PlantingSchedule.find().sort({ cropName: 1 }));
  } catch { res.status(500).json({ message: 'Error fetching schedules.' }); }
});

module.exports = router;