const { MongooseError } = require('mongoose');

// Error types
const ErrorTypes = {
  VALIDATION_ERROR: 'ValidationError',
  AUTHENTICATION_ERROR: 'AuthenticationError',
  AUTHORIZATION_ERROR: 'AuthorizationError',
  NOT_FOUND_ERROR: 'NotFoundError',
  RATE_LIMIT_ERROR: 'RateLimitError',
  DATABASE_ERROR: 'DatabaseError',
  EMAIL_ERROR: 'EmailError',
  SERVER_ERROR: 'ServerError'
};

// Custom error class
class AppError extends Error {
  constructor(type, message, statusCode = 500, details = null) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log error details
  console.error('Error occurred:', {
    name: err.name,
    type: err.type || 'UnknownError',
    message: err.message,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  // Initialize error response
  let errorResponse = {
    success: false,
    error: {
      type: err.type || 'UnknownError',
      message: process.env.NODE_ENV === 'production' 
        ? 'An error occurred' 
        : err.message || 'Internal server error',
      code: err.statusCode || 500
    }
  };

  // Handle specific error types
  if (err instanceof AppError) {
    errorResponse.error.type = err.type;
    errorResponse.error.code = err.statusCode;
    if (process.env.NODE_ENV === 'development' && err.details) {
      errorResponse.error.details = err.details;
    }
  }
  // Handle Mongoose Validation Errors
  else if (err instanceof MongooseError) {
    errorResponse.error.type = ErrorTypes.VALIDATION_ERROR;
    errorResponse.error.code = 400;
    if (err.name === 'ValidationError') {
      errorResponse.error.details = Object.values(err.errors).map(e => ({
        field: e.path,
        message: e.message
      }));
    }
  }
  // Handle Express Rate Limit Errors
  else if (err.type === 'RateLimitExceeded') {
    errorResponse.error.type = ErrorTypes.RATE_LIMIT_ERROR;
    errorResponse.error.code = 429;
    errorResponse.error.message = 'Too many requests';
  }
  // Handle Nodemailer Errors
  else if (err.message && err.message.includes('EAUTH')) {
    errorResponse.error.type = ErrorTypes.EMAIL_ERROR;
    errorResponse.error.code = 500;
    errorResponse.error.message = 'Email service configuration error';
  }
  // Handle other common errors
  else {
    switch (err.name) {
      case 'CastError':
        errorResponse.error.type = ErrorTypes.VALIDATION_ERROR;
        errorResponse.error.code = 400;
        errorResponse.error.message = 'Invalid data format';
        break;
      case 'JsonWebTokenError':
        errorResponse.error.type = ErrorTypes.AUTHENTICATION_ERROR;
        errorResponse.error.code = 401;
        errorResponse.error.message = 'Invalid token';
        break;
      case 'TokenExpiredError':
        errorResponse.error.type = ErrorTypes.AUTHENTICATION_ERROR;
        errorResponse.error.code = 401;
        errorResponse.error.message = 'Token expired';
        break;
      default:
        errorResponse.error.type = ErrorTypes.SERVER_ERROR;
        errorResponse.error.code = 500;
        break;
    }
  }

  // Add request ID for tracking
  errorResponse.error.requestId = req.id || crypto.randomBytes(4).toString('hex');

  // Log error to monitoring service in production
  if (process.env.NODE_ENV === 'production') {
    // Here you could integrate with error monitoring services
    // like Sentry, New Relic, etc.
  }

  // Send error response
  res.status(errorResponse.error.code).json(errorResponse);
};

// Async handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Request ID middleware
const addRequestId = (req, res, next) => {
  req.id = crypto.randomBytes(4).toString('hex').toUpperCase();
  next();
};

// Export everything
module.exports = {
  ErrorTypes,
  AppError,
  errorHandler,
  asyncHandler,
  addRequestId
};