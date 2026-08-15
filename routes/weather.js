const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, async (req, res) => {
  const { city } = req.query;
  const location = city || 'Oshogbo';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(404).json({ message: 'Location not found.' });
    }

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const weatherMain = data.weather[0].main;

    // Planting advice based on weather
    const advice = [];
    if (temp >= 10 && temp <= 20) advice.push({ crop: 'Lettuce', suitable: true, reason: `Temperature (${temp.toFixed(1)}°C) is ideal for Lettuce.` });
    else advice.push({ crop: 'Lettuce', suitable: false, reason: `Temperature (${temp.toFixed(1)}°C) is outside Lettuce's ideal range of 15–20°C.` });

    if (temp >= 10 && temp <= 18) advice.push({ crop: 'Spinach', suitable: true, reason: `Temperature (${temp.toFixed(1)}°C) is ideal for Spinach.` });
    else advice.push({ crop: 'Spinach', suitable: false, reason: `Temperature (${temp.toFixed(1)}°C) is outside Spinach's ideal range of 10–18°C.` });

    if (temp >= 15 && temp <= 25) advice.push({ crop: 'Cabbage', suitable: true, reason: `Temperature (${temp.toFixed(1)}°C) is ideal for Cabbage.` });
    else advice.push({ crop: 'Cabbage', suitable: false, reason: `Temperature (${temp.toFixed(1)}°C) is outside Cabbage's ideal range of 15–25°C.` });

    if (humidity < 40) advice.push({ crop: 'General', suitable: false, reason: 'Low humidity detected. Consider irrigation to support crop growth.' });
    if (weatherMain === 'Rain') advice.push({ crop: 'General', suitable: true, reason: 'Rainfall detected. Good conditions for Cabbage. Avoid overwatering Lettuce.' });

    res.json({
      location: data.name,
      temperature: temp.toFixed(1),
      humidity,
      description,
      weatherMain,
      windSpeed: data.wind.speed,
      advice,
    });
  } catch (err) {
    console.error('Weather error:', err);
    res.status(500).json({ message: 'Failed to fetch weather data.' });
  }
});

module.exports = router;