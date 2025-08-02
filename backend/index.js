const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const crypto = require('crypto');

// Import security middleware
const {
  SECURITY_CONFIG,
  apiRateLimiter,
  emailRateLimiter,
  validateFormInput,
  corsOptions,
  securityHeaders,
  requestLogger,
  errorHandler,
  securityMonitor
} = require('./security/securityMiddleware');

// Load environment variables
dotenv.config();

// Load production configuration
const isProduction = process.env.NODE_ENV === 'production';
const config = isProduction ? require('./config/production') : null;

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// CORS configuration
const allowedOrigins = isProduction 
  ? config.security.allowedOrigins
  : [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:4173', // Vite preview
      'https://maiyahospital.com',
      'https://www.maiyahospital.com',
      'https://your-frontend-domain.com',
      'https://your-app-name.onrender.com',
      'https://canva-wordpress-refresh.onrender.com',
      'https://canva-wordpress-refresh-1.onrender.com'
    ];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, be more permissive
    if (!isProduction) {
      console.log('🌐 CORS: Allowing origin:', origin);
      return callback(null, true);
    }
    
    // In production, check against allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('✅ CORS: Allowing origin:', origin);
      callback(null, true);
    } else {
      console.log('🚫 CORS: Blocked origin:', origin);
      console.log('📋 Allowed origins:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: isProduction ? config.security.apiRateLimit.windowMs : 15 * 60 * 1000,
  max: isProduction ? config.security.apiRateLimit.max : 100,
  message: {
    error: isProduction ? config.security.apiRateLimit.message : 'Too many requests from this IP',
    retryAfter: 900
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/', limiter);

// Email-specific rate limiting
const emailLimiter = rateLimit({
  windowMs: isProduction ? config.security.emailRateLimit.windowMs : 15 * 60 * 1000,
  max: isProduction ? config.security.emailRateLimit.max : 10,
  message: {
    error: isProduction ? config.security.emailRateLimit.message : 'Too many email requests from this IP',
    retryAfter: 900
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/appointments', emailLimiter);
app.use('/api/messages', emailLimiter);
app.use('/api/consultations', emailLimiter);
app.use('/api/assessments', emailLimiter);

// Request size limiting
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Request logging
app.use(requestLogger);

// Apply input validation to form routes
app.use('/api/appointments', validateFormInput);
app.use('/api/messages', validateFormInput);
app.use('/api/consultations', validateFormInput);
app.use('/api/assessments', validateFormInput);

// MongoDB Connection with security
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/maiya-hospital';
const dbOptions = isProduction ? config.database.options : {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
};

console.log('🔗 Connecting to MongoDB...');
console.log('📊 Environment:', process.env.NODE_ENV || 'development');
console.log('🌐 MongoDB URI:', MONGODB_URI ? 'Set' : 'Not set');

mongoose.connect(MONGODB_URI, dbOptions)
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
  console.log('📊 Database:', mongoose.connection.name);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  console.error('🔧 Please check your MONGODB_URI environment variable');
});

// Import routes
const blogsRouter = require('./routes/blogs');
const doctorsRouter = require('./routes/doctors');
const eventsRouter = require('./routes/events');
const appointmentsRouter = require('./routes/appointments');
const messagesRouter = require('./routes/messages');
const consultationsRouter = require('./routes/consultations');
const assessmentsRouter = require('./routes/assessments');
const updatesRouter = require('./routes/updates');
const testimonialsRouter = require('./routes/testimonials');
const faqsRouter = require('./routes/faqs');
const usersRouter = require('./routes/users');
const healthNewsRouter = require('./routes/healthNews');

// Use routes
console.log('🔗 Setting up API routes...');
app.use('/api/blogs', blogsRouter);
app.use('/api/doctors', doctorsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/consultations', consultationsRouter);
app.use('/api/assessments', assessmentsRouter);
app.use('/api/updates', updatesRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/users', usersRouter);
app.use('/api/health-news', healthNewsRouter);
console.log('✅ All API routes configured');

// Health check endpoint with security info
app.get('/api/health', (req, res) => {
  console.log('🏥 Health check requested');
  res.json({ 
    status: 'OK', 
    message: 'Maiya Hospital API is running securely',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    security: {
      blockedRequests: securityMonitor.blockedRequests,
      rateLimitedRequests: securityMonitor.rateLimitedRequests,
      suspiciousActivities: securityMonitor.suspiciousActivities.length
    }
  });
});

// Security stats endpoint (admin only)
app.get('/api/security/stats', (req, res) => {
  // In production, add authentication here
  res.json({
    stats: securityMonitor.getStats()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Maiya Hospital API is running',
    status: 'OK',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      test: '/test',
      appointments: '/api/appointments',
      messages: '/api/messages',
      consultations: '/api/consultations',
      assessments: '/api/assessments'
    }
  });
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Test working securely' });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running securely on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔒 Security features enabled:`);
  console.log(`   - Rate limiting`);
  console.log(`   - Input validation`);
  console.log(`   - XSS protection`);
  console.log(`   - CORS protection`);
  console.log(`   - Security headers`);
  console.log(`   - Request logging`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔍 Security stats: http://localhost:${PORT}/api/security/stats`);
  console.log(`🌐 Root endpoint: http://localhost:${PORT}/`);
  console.log(`✅ Server ready to accept requests`);
});