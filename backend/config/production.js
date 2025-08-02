// Production configuration for Render deployment
module.exports = {
  // Database configuration
  database: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      bufferMaxEntries: 0,
      bufferCommands: false,
      // Production optimizations
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    }
  },

  // Email configuration
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    // Production email settings
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateDelta: 1000,
    rateLimit: 5
  },

  // Security configuration
  security: {
    // Rate limiting (more strict in production)
    apiRateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 50, // Reduced from 100 for production
      message: 'Too many requests from this IP'
    },
    emailRateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5, // Reduced from 10 for production
      message: 'Too many email requests from this IP'
    },
    // CORS origins for production
    allowedOrigins: [
      'https://maiyahospital.com',
      'https://www.maiyahospital.com',
      'https://your-frontend-domain.com',
      'https://your-app-name.onrender.com'
    ]
  },

  // Server configuration
  server: {
    port: process.env.PORT || 10000,
    host: '0.0.0.0', // Required for Render
    trustProxy: true // Trust proxy headers
  },

  // Logging configuration
  logging: {
    level: 'info',
    format: 'json',
    timestamp: true
  },

  // Health check configuration
  healthCheck: {
    timeout: 5000,
    interval: 30000
  }
}; 