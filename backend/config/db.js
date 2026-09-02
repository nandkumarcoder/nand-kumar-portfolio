const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (uri) {
    try {
      await mongoose.connect(uri);
      console.log('✅ MongoDB Database connected successfully');
      return { type: 'mongodb' };
    } catch (err) {
      console.error('❌ MongoDB Connection error:', err.message);
      console.log('🔄 Falling back to Persistent File Database...');
    }
  }

  // Local persistent JSON database
  const dbPath = path.join(__dirname, '..', 'data', 'database.json');
  if (!fs.existsSync(dbPath)) {
    const initialStore = require('../data/store');
    fs.writeFileSync(dbPath, JSON.stringify(initialStore, null, 2), 'utf8');
  }
  console.log(`✅ Persistent File Database initialized at ${dbPath}`);
  return { type: 'local', path: dbPath };
};

module.exports = connectDB;
