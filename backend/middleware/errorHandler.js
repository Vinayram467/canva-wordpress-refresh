// Error types
const ErrorTypes = {
  VALIDATION_ERROR: 'ValidationError',
  AUTHENTICATION_ERROR: 'AuthenticationError',
  AUTHORIZATION_ERROR: 'AuthorizationError',
  NOT_FOUND_ERROR: 'NotFoundError',
  RATE_LIMIT_ERROR: 'RateLimitError',
  DATABASE_ERROR: 'DatabaseError',
  EMAIL_ERROR: 'EmailError'
};

// Custom error class
class AppError extends Error {
  constructor(type, message, statusCode = 500, details = null) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', {
    type: err.type || 'UnknownError',
    message: err.message,
    stack: err.stack,
    details: err.details || {},
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Default error response
  const errorResponse = {
    success: false,
    error: {
      type: err.type || 'UnknownError',
      message: process.env.NODE_ENV === 'production' 
        ? 'An error occurred' 
        : err.message || 'Internal server error',
      code: err.statusCode || 500
    }
  };

  // Add details in development
  if (process.env.NODE_ENV !== 'production' && err.details) {
    errorResponse.error.details = err.details;
  }

  // Handle specific error types
  switch (err.type) {
    case ErrorTypes.VALIDATION_ERROR:
      errorResponse.error.code = 400;
      break;
    
    case ErrorTypes.AUTHENTICATION_ERROR:
      errorResponse.error.code = 401;
      break;
    
    case ErrorTypes.AUTHORIZATION_ERROR:
      errorResponse.error.code = 403;
      break;
    
    case ErrorTypes.NOT_FOUND_ERROR:
      errorResponse.error.code = 404;
      break;
    
    case ErrorTypes.RATE_LIMIT_ERROR:
      errorResponse.error.code = 429;
      break;
    
    case ErrorTypes.DATABASE_ERROR:
      errorResponse.error.code = 503;
      errorResponse.error.message = 'Database service unavailable';
      break;
    
    case ErrorTypes.EMAIL_ERROR:
      errorResponse.error.code = 502;
      errorResponse.error.message = 'Email service unavailable';
      break;
    
    default:
      // Handle mongoose validation errors
      if (err.name === 'ValidationError') {
        errorResponse.error.code = 400;
        errorResponse.error.type = ErrorTypes.VALIDATION_ERROR;
        errorResponse.error.details = Object.values(err.errors).map(e => e.message);
      }
      // Handle mongoose cast errors
      else if (err.name === 'CastError') {
        errorResponse.error.code = 400;
        errorResponse.error.type = ErrorTypes.VALIDATION_ERROR;
        errorResponse.error.message = 'Invalid data format';
      }
      break;
  }

  // Log error to monitoring service if in production
  if (process.env.NODE_ENV === 'production') {
    // Here you could add integration with error monitoring services
    // like Sentry, New Relic, etc.
  }

  // Send error response
  res.status(errorResponse.error.code).json(errorResponse);
};

// Async handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Export everything
module.exports = {
  ErrorTypes,
  AppError,
  errorHandler,
  asyncHandler
};