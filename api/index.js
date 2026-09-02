const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('../backend/config/db');

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Initialize MongoDB Atlas connection
connectDB();

app.use('/api/auth', require('../backend/routes/auth'));
app.use('/api/blogs', require('../backend/routes/blogs'));
app.use('/api/contact', require('../backend/routes/contact'));
app.use('/api/chatbot', require('../backend/routes/chatbot'));
app.use('/api/projects', require('../backend/routes/projects'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mongodb: 'connected', timestamp: new Date() });
});

module.exports = app;
