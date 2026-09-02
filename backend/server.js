const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins: local dev + GitHub Pages production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://nandkumarcoder.github.io',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true
}));

app.use(express.json());

// Initialize Database connection (MongoDB with local persistent JSON fallback)
connectDB();

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

// Health check / root (Render pings this to verify the service is alive)
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Nand Kumar Portfolio API is live with Database active!', timestamp: new Date() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Nand Kumar Portfolio Backend & Database are running smoothly', timestamp: new Date() });
});

// Listen on 0.0.0.0 for Render & local compatibility
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`);
});
