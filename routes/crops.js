const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, async (req, res) => {
  try {
    res.json(await Crop.find().sort({ cropName: 1 }));
  } catch { res.status(500).json({ message: 'Error fetching crops.' }); }
});

module.exports = router;