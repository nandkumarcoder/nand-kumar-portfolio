// Centralized API base URL
// In development: http://localhost:5000
// In production (GitHub Pages): https://nand-kumar-portfolio-api.onrender.com

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_BASE_URL;
