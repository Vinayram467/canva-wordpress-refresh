// API Configuration
export const API_CONFIG = {
  // For development (local backend)
  DEVELOPMENT_URL: 'http://localhost:3001/api',
  
  // For production (Render backend) - Update this with your actual Render URL
  PRODUCTION_URL: 'https://canva-wordpress-refresh.onrender.com/api',
  
  // Current API URL (will use production in build, development in dev)
  BASE_URL: import.meta.env.PROD 
    ? import.meta.env.VITE_API_URL || 'https://canva-wordpress-refresh.onrender.com/api'
    : import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
};

export default API_CONFIG; 