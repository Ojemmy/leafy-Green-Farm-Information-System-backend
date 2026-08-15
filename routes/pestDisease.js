const express = require('express');
const router = express.Router();
const PestDisease = require('../models/PestDisease');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, async (req, res) => {
  try {
    res.json(await PestDisease.find().sort({ name: 1 }));
  } catch { res.status(500).json({ message: 'Error fetching records.' }); }
});

router.post('/search', verifyToken, async (req, res) => {
  const { symptom } = req.body;
  try {
    const results = await PestDisease.find({
      $or: [
        { damageType: { $regex: symptom, $options: 'i' } },
        { symptoms: { $regex: symptom, $options: 'i' } },
        { name: { $regex: symptom, $options: 'i' } }
      ]
    });
    results.length > 0
      ? res.json({ success: true, results })
      : res.json({ success: false, message: 'No match found. Try different keywords.' });
  } catch { res.status(500).json({ message: 'Search failed.' }); }
});

module.exports = router;