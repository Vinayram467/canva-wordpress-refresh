const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const { ipKeyGenerator } = require('express-rate-limit');

// Security configurations
const SECURITY_CONFIG = {
  ALLOWED_ORIGINS: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://maiyahospital.com',
    'https://www.maiyahospital.com',
    'https://maiyahospital.in',
    'https://www.maiyahospital.in',
    'https://canva-wordpress-refresh.onrender.com'
  ],
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_REQUESTS: 100, // limit each IP to 100 requests per windowMs
    MESSAGE: 'Too many requests from this IP, please try again later.',
    STANDARDIZE_HEADERS: true,
    LEGACY_HEADERS: false
  },
  EMAIL_RATE_LIMIT: {
    WINDOW_MS: 60 * 60 * 1000, // 1 hour
    MAX_REQUESTS: 5, // limit each IP to 5 email requests per hour
    MESSAGE: 'Too many email requests from this IP, please try again later.'
  }
};

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    if (SECURITY_CONFIG.ALLOWED_ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600
};

// Rate limiting configuration with proper IP handling
const apiLimiter = rateLimit({
  windowMs: SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS,
  max: SECURITY_CONFIG.RATE_LIMIT.MAX_REQUESTS,
  message: { error: SECURITY_CONFIG.RATE_LIMIT.MESSAGE },
  standardHeaders: SECURITY_CONFIG.RATE_LIMIT.STANDARDIZE_HEADERS,
  legacyHeaders: SECURITY_CONFIG.RATE_LIMIT.LEGACY_HEADERS,
  keyGenerator: (req) => ipKeyGenerator(req, { ipv6: true })
});

const emailLimiter = rateLimit({
  windowMs: SECURITY_CONFIG.EMAIL_RATE_LIMIT.WINDOW_MS,
  max: SECURITY_CONFIG.EMAIL_RATE_LIMIT.MAX_REQUESTS,
  message: { error: SECURITY_CONFIG.EMAIL_RATE_LIMIT.MESSAGE },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => ipKeyGenerator(req, { ipv6: true })
});

// Helmet configuration
const helmetConfig = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", ...SECURITY_CONFIG.ALLOWED_ORIGINS],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  dnsPrefetchControl: { allow: true },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
};

// Security monitoring
const securityMonitor = {
  blockedRequests: 0,
  rateLimitedRequests: 0,
  suspiciousActivities: [],
  lastReset: Date.now(),

  logBlockedRequest: function(req, reason) {
    this.blockedRequests++;
    this.suspiciousActivities.push({
      timestamp: new Date().toISOString(),
      ip: ipKeyGenerator(req, { ipv6: true }),
      url: req.url,
      reason: reason
    });
  },

  logRateLimitedRequest: function(req) {
    this.rateLimitedRequests++;
  },

  getStats: function() {
    return {
      blockedRequests: this.blockedRequests,
      rateLimitedRequests: this.rateLimitedRequests,
      suspiciousActivities: this.suspiciousActivities.slice(-100),
      uptime: Date.now() - this.lastReset
    };
  },

  resetStats: function() {
    this.blockedRequests = 0;
    this.rateLimitedRequests = 0;
    this.suspiciousActivities = [];
    this.lastReset = Date.now();
  }
};

// Email validation function
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Export middleware and configurations
module.exports = {
  corsOptions,
  apiLimiter,
  emailLimiter,
  helmetConfig,
  requestLogger,
  securityMonitor,
  SECURITY_CONFIG,
  validateEmail
};