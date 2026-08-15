require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Crop = require('../models/Crop');
const PestDisease = require('../models/PestDisease');
const PlantingSchedule = require('../models/PlantingSchedule');

const crops = [
  { cropName: 'Lettuce', growthDuration: '45 - 60 days', optimalTemperature: '15 - 20°C', waterRequirement: 'Moderate', plantingPeriod: 'March - May', harvestPeriod: 'May - June', weatherRequirement: 'Cool, Moist', commonDiseases: 'Downy Mildew, Leaf Spot', commonPests: 'Aphids' },
  { cropName: 'Spinach', growthDuration: '30 - 45 days', optimalTemperature: '10 - 18°C', waterRequirement: 'High', plantingPeriod: 'February - April', harvestPeriod: 'April - May', weatherRequirement: 'Cool', commonDiseases: 'Damping-off, Leaf Blight', commonPests: 'Leaf Miners' },
  { cropName: 'Cabbage', growthDuration: '70 - 90 days', optimalTemperature: '15 - 25°C', waterRequirement: 'Moderate', plantingPeriod: 'June - August', harvestPeriod: 'September - October', weatherRequirement: 'Moderate Rainfall', commonDiseases: 'Black Rot, Clubroot', commonPests: 'Cabbage Worms' }
];

const pestDiseases = [
  { name: 'Aphids', type: 'Pest', cropAffected: 'Lettuce', damageType: 'Leaf Curling', symptoms: 'Leaves curl and yellow, sticky residue, stunted growth', controlMethod: 'Apply insecticide spray or neem oil. Introduce ladybugs as natural predators.' },
  { name: 'Leaf Miners', type: 'Pest', cropAffected: 'Spinach', damageType: 'Leaf Holes', symptoms: 'Winding white trails on leaves, irregular holes, leaf drop', controlMethod: 'Remove affected leaves, apply biological control agents, use yellow sticky traps.' },
  { name: 'Cabbage Worms', type: 'Pest', cropAffected: 'Cabbage', damageType: 'Tunnel Marks', symptoms: 'Large irregular holes in leaves, green caterpillars visible', controlMethod: 'Apply neem-based spray, use Bacillus thuringiensis (Bt), hand-pick caterpillars.' },
  { name: 'Downy Mildew', type: 'Disease', cropAffected: 'Lettuce', damageType: 'Yellow Spots', symptoms: 'Yellow angular spots on upper leaf, white-grey mold underneath, wilting', controlMethod: 'Improve air circulation, apply copper-based fungicide, avoid overhead watering.' },
  { name: 'Black Rot', type: 'Disease', cropAffected: 'Cabbage', damageType: 'Black Edges', symptoms: 'V-shaped yellow lesions at leaf margins, blackened veins', controlMethod: 'Remove infected plants, practice crop rotation, apply copper hydroxide fungicide.' },
  { name: 'Damping Off', type: 'Disease', cropAffected: 'Spinach', damageType: 'Stem Rot', symptoms: 'Seedlings collapse at soil level, water-soaked stem base', controlMethod: 'Improve soil drainage, reduce watering, treat seeds with fungicide before planting.' }
];

const schedules = [
  { cropName: 'Lettuce', plantingPeriod: 'March - May', harvestPeriod: 'May - June', weatherRequirement: 'Cool, Moist', notes: 'Avoid hot dry conditions. Best in shaded areas during dry season.' },
  { cropName: 'Spinach', plantingPeriod: 'February - April', harvestPeriod: 'April - May', weatherRequirement: 'Cool', notes: 'Needs consistent moisture. Harvest outer leaves to encourage regrowth.' },
  { cropName: 'Cabbage', plantingPeriod: 'June - August', harvestPeriod: 'September - October', weatherRequirement: 'Moderate Rainfall', notes: 'Plant at start of rainy season. Watch for caterpillars during growth.' }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Crop.deleteMany({});
  await PestDisease.deleteMany({});
  await PlantingSchedule.deleteMany({});
  await Crop.insertMany(crops);
  await PestDisease.insertMany(pestDiseases);
  await PlantingSchedule.insertMany(schedules);
  console.log('✅ Database seeded!');
  process.exit(0);
}
seed().catch(err => { console.error(err); process.exit(1); });