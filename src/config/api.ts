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

// Strapi CMS Configuration (for future use)
export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
export const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

export const fetchFromStrapi = async (endpoint: string) => {
  const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

// Content Service (temporary until Strapi is working)
export const getContent = async (endpoint: string) => {
  // For now, return mock data
  return {
    data: [],
    meta: {}
  };
};

export default API_CONFIG; 