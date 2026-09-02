// Centralized API base URL
// Production URL from Render.com: https://nand-kumar-portfolio.onrender.com

const API_BASE_URL = import.meta.env.MODE === 'production'
  ? 'https://nand-kumar-portfolio.onrender.com'
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000');

export default API_BASE_URL;
