const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const crypto = require('crypto');

// Security configurations
const SECURITY_CONFIG = {
  // Rate limiting
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100, // requests per window
  MAX_EMAIL_REQUESTS: 10, // email requests per window
  
  // Input validation
  MAX_FIELD_LENGTH: 1000,
  ALLOWED_EMAIL_DOMAINS: ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'],
  
  // Content Security
  BLOCKED_WORDS: ['script', 'javascript:', 'onload', 'onerror', 'eval', 'expression', 'vbscript:', 'data:'],
  
  // Request validation
  MAX_REQUEST_SIZE: '1mb',
  MAX_FIELDS: 50,
  MAX_FILES: 5
};

// Input sanitization
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  // Remove potentially dangerous content
  let sanitized = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/eval\s*\(/gi, '')
    .replace(/expression\s*\(/gi, '')
    .replace(/<iframe/gi, '')
    .replace(/<object/gi, '')
    .replace(/<embed/gi, '')
    .trim();
  
  // Limit length
  if (sanitized.length > SECURITY_CONFIG.MAX_FIELD_LENGTH) {
    sanitized = sanitized.substring(0, SECURITY_CONFIG.MAX_FIELD_LENGTH) + '...';
  }
  
  return sanitized;
};

// Email validation
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  const domain = email.split('@')[1];
  return SECURITY_CONFIG.ALLOWED_EMAIL_DOMAINS.includes(domain);
};

// Check for blocked content
const containsBlockedContent = (text) => {
  if (!text || typeof text !== 'string') return false;
  const lowerText = text.toLowerCase();
  return SECURITY_CONFIG.BLOCKED_WORDS.some(word => lowerText.includes(word));
};

// Rate limiting middleware
const createRateLimiter = (windowMs, maxRequests, message = 'Too many requests') => {
  return rateLimit({
    windowMs,
    max: maxRequests,
    message: {
      error: message,
      retryAfter: Math.ceil(windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        error: message,
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
  });
};

// General API rate limiter
const apiRateLimiter = createRateLimiter(
  SECURITY_CONFIG.WINDOW_MS,
  SECURITY_CONFIG.MAX_REQUESTS,
  'Too many API requests'
);

// Email-specific rate limiter
const emailRateLimiter = createRateLimiter(
  SECURITY_CONFIG.WINDOW_MS,
  SECURITY_CONFIG.MAX_EMAIL_REQUESTS,
  'Too many email requests'
);

// Input validation middleware
const validateFormInput = (req, res, next) => {
  try {
    // Check request size
    if (req.headers['content-length'] && 
        parseInt(req.headers['content-length']) > SECURITY_CONFIG.MAX_REQUEST_SIZE) {
      return res.status(413).json({ error: 'Request too large' });
    }
    
    // Check number of fields
    const fieldCount = Object.keys(req.body).length;
    if (fieldCount > SECURITY_CONFIG.MAX_FIELDS) {
      return res.status(400).json({ error: 'Too many form fields' });
    }
    
    // Sanitize all input fields
    const sanitizedBody = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        sanitizedBody[key] = sanitizeInput(value);
        
        // Check for blocked content
        if (containsBlockedContent(value)) {
          return res.status(400).json({ error: 'Input contains blocked content' });
        }
      } else {
        sanitizedBody[key] = value;
      }
    }
    
    // Validate email fields
    const emailFields = ['email', 'patientEmail', 'userEmail'];
    for (const field of emailFields) {
      if (sanitizedBody[field] && !validateEmail(sanitizedBody[field])) {
        return res.status(400).json({ error: `Invalid email format in ${field}` });
      }
    }
    
    // Replace request body with sanitized data
    req.body = sanitizedBody;
    next();
    
  } catch (error) {
    console.error('Input validation error:', error);
    return res.status(400).json({ error: 'Invalid input data' });
  }
};

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://maiyahospital.com',
      'https://www.maiyahospital.com'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Security headers middleware
const securityHeaders = helmet({
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
});

// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress
    };
    
    console.log('Request:', JSON.stringify(logData));
  });
  
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    error: isDevelopment ? err.message : 'Internal server error',
    ...(isDevelopment && { stack: err.stack })
  });
};

// Security monitoring
const securityMonitor = {
  blockedRequests: 0,
  rateLimitedRequests: 0,
  suspiciousActivities: [],
  
  logSuspiciousActivity: (activity) => {
    securityMonitor.suspiciousActivities.push({
      timestamp: new Date().toISOString(),
      activity,
      ip: activity.ip || 'unknown'
    });
    
    // Keep only last 1000 activities
    if (securityMonitor.suspiciousActivities.length > 1000) {
      securityMonitor.suspiciousActivities = securityMonitor.suspiciousActivities.slice(-1000);
    }
  },
  
  getStats: () => ({
    blockedRequests: securityMonitor.blockedRequests,
    rateLimitedRequests: securityMonitor.rateLimitedRequests,
    suspiciousActivities: securityMonitor.suspiciousActivities.length
  })
};

module.exports = {
  // Middleware
  apiRateLimiter,
  emailRateLimiter,
  validateFormInput,
  securityHeaders,
  corsOptions,
  requestLogger,
  errorHandler,
  
  // Utilities
  sanitizeInput,
  validateEmail,
  containsBlockedContent,
  securityMonitor,
  
  // Config
  SECURITY_CONFIG
}; 