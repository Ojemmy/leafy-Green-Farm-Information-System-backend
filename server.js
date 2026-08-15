require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const cropRoutes = require('./routes/crops');
const pestDiseaseRoutes = require('./routes/pestDisease');
const plantingRoutes = require('./routes/planting');
const weatherRoutes = require('./routes/weather');
const diagnoseRoutes = require('./routes/diagnose');
const adminRoutes = require('./routes/admin');

const app = express();
app.use(express.json({ limit: '10mb' }));
const clientUrl = process.env.CLIENT_URL || 'https://leafy-green-farm-information-system.vercel.app/';
const allowedOrigins = clientUrl.split(',').map(url => url.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/pest-diseases', pestDiseaseRoutes);
app.use('/api/planting', plantingRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/diagnose', diagnoseRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.json({ message: '🌿 Leafy Green Farm API running' }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ DB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));