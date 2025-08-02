const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const crypto = require('crypto');

// Security configuration
const SECURITY_CONFIG = {
  // Rate limiting
  apiRateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
    message: 'Too many requests from this IP'
  },
  emailRateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 email requests per windowMs
    message: 'Too many email requests from this IP'
  },
  
  // Input validation
  maxFieldLength: 1000,
  maxFields: 50,
  maxRequestSize: 1024 * 1024, // 1MB
  
  // Content filtering
  blockedWords: [
    'script', 'javascript:', 'onload', 'onerror', 'eval', 'expression',
    'vbscript:', 'data:', 'iframe', 'object', 'embed', 'base64',
    'document.cookie', 'window.location', 'alert(', 'confirm(',
    'prompt(', 'setTimeout', 'setInterval', 'Function('
  ],
  
  // Email validation
  allowedEmailDomains: ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'],
  
  // CORS origins
  allowedOrigins: [
    'https://maiyahospital.com',
    'https://www.maiyahospital.com',
    'https://canva-wordpress-refresh.onrender.com',
    'https://canva-wordpress-refresh-1.onrender.com',
    'http://localhost:3000',
    'http://localhost:5173'
  ]
};

// Input sanitization
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  let sanitized = input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove dangerous protocols
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=/gi, '')
    // Remove dangerous functions
    .replace(/eval\s*\(/gi, '')
    .replace(/expression\s*\(/gi, '')
    .replace(/Function\s*\(/gi, '')
    // Remove iframe, object, embed
    .replace(/<iframe/gi, '')
    .replace(/<object/gi, '')
    .replace(/<embed/gi, '')
    // Remove base64
    .replace(/base64/gi, '')
    // Trim whitespace
    .trim();
  
  // Limit length
  if (sanitized.length > SECURITY_CONFIG.maxFieldLength) {
    sanitized = sanitized.substring(0, SECURITY_CONFIG.maxFieldLength) + '...';
  }
  
  return sanitized;
};

// Validate email
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  const domain = email.split('@')[1];
  return SECURITY_CONFIG.allowedEmailDomains.includes(domain);
};

// Check for blocked content
const containsBlockedContent = (text) => {
  const lowerText = text.toLowerCase();
  return SECURITY_CONFIG.blockedWords.some(word => lowerText.includes(word));
};

// Create rate limiters
const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: { error: message },
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

// API rate limiter
const apiRateLimiter = createRateLimiter(
  SECURITY_CONFIG.apiRateLimit.windowMs,
  SECURITY_CONFIG.apiRateLimit.max,
  SECURITY_CONFIG.apiRateLimit.message
);

// Email rate limiter
const emailRateLimiter = createRateLimiter(
  SECURITY_CONFIG.emailRateLimit.windowMs,
  SECURITY_CONFIG.emailRateLimit.max,
  SECURITY_CONFIG.emailRateLimit.message
);

// Input validation middleware
const validateFormInput = (req, res, next) => {
  try {
    // Check request size
    if (req.headers['content-length'] && 
        parseInt(req.headers['content-length']) > SECURITY_CONFIG.maxRequestSize) {
      return res.status(413).json({ error: 'Request too large' });
    }
    
    // Check number of fields
    const fieldCount = Object.keys(req.body).length;
    if (fieldCount > SECURITY_CONFIG.maxFields) {
      return res.status(400).json({ error: 'Too many form fields' });
    }
    
    // Sanitize all input fields
    const sanitizedBody = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === 'string') {
        const sanitized = sanitizeInput(value);
        
        // Check for blocked content
        if (containsBlockedContent(value)) {
          return res.status(400).json({ error: 'Input contains blocked content' });
        }
        
        sanitizedBody[key] = sanitized;
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
    
    // Check against allowed origins
    if (SECURITY_CONFIG.allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS: Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Security headers
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
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true,
  frameguard: { action: 'deny' }
});

// Request logging
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
      ip: req.ip || req.connection.remoteAddress,
      contentLength: req.headers['content-length'] || 0
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
  SECURITY_CONFIG,
  sanitizeInput,
  validateEmail,
  containsBlockedContent,
  apiRateLimiter,
  emailRateLimiter,
  validateFormInput,
  corsOptions,
  securityHeaders,
  requestLogger,
  errorHandler,
  securityMonitor
}; 