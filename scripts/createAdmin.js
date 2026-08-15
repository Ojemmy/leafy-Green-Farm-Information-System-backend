require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@leafyfarm.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@1234';

  if (await User.findOne({ email: adminEmail })) {
    console.log('⚠️  Admin already exists.'); return process.exit(0);
  }
  await new User({
    name: 'System Admin',
    email: adminEmail,
    password: await bcrypt.hash(adminPassword, 10),
    role: 'admin'
  }).save();
  console.log(`✅ Admin created!\n   Email: ${adminEmail}`);
  process.exit(0);
}
createAdmin().catch(err => { console.error(err); process.exit(1); });