const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { verifyToken } = require('../middleware/auth');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/image', verifyToken, async (req, res) => {
  const { imageBase64, mimeType } = req.body;
  if (!imageBase64) return res.status(400).json({ message: 'No image provided.' });

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `You are an expert agricultural specialist for leafy green vegetables (lettuce, spinach, cabbage).
Analyze this crop image and identify any pest or disease visible.
Respond ONLY in this exact JSON format, no other text:
{
  "identified": true,
  "name": "Name of pest or disease",
  "type": "Pest or Disease",
  "cropAffected": "Which crop",
  "symptoms": "Visible symptoms",
  "severity": "Low / Moderate / High",
  "controlMethod": "Recommended treatment",
  "additionalAdvice": "Extra farming advice"
}
If nothing is identified, set identified to false and explain briefly in name.`;

    const result = await model.generateContent([
      prompt,
      { inlineData: { mimeType: mimeType || 'image/jpeg', data: imageBase64 } }
    ]);

    const text = result.response.text().replace(/```json|```/g, '').trim();
    res.json({ success: true, diagnosis: JSON.parse(text) });
  // } catch (err) {
  //   console.error('Gemini error:', err);
  //   res.status(500).json({ message: 'AI diagnosis failed. Please try again.' });
  // }
  } catch (err) {
    console.error('Gemini error details:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ message: 'AI diagnosis failed. Please try again.' });
  }
});

module.exports = router;