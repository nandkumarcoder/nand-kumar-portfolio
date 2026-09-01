const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004 || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const contactRoutes = require('./routes/contact');
const chatbotRoutes = require('./routes/chatbot');
const projectRoutes = require('./routes/projects');

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/projects', projectRoutes);

// Base status route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Nand Kumar Portfolio Backend is running', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
