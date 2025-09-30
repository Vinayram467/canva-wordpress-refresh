const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import security middleware
const {
  corsOptions,
  apiLimiter,
  emailLimiter,
  helmetConfig,
  requestLogger,
  securityMonitor,
  SECURITY_CONFIG
} = require('./security/securityMiddleware');

// Import error handling
const {
  errorHandler,
  asyncHandler,
  AppError,
  ErrorTypes,
  addRequestId
} = require('./middleware/errorHandler');

const app = express();

// Trust proxy - required for rate limiting behind reverse proxies
app.set('trust proxy', 1);

// Basic middleware
app.use(addRequestId); // Add request ID first
app.use(helmet(helmetConfig));
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(requestLogger);

// Apply rate limiting
app.use('/api/', apiLimiter);
app.use(['/api/appointments', '/api/messages', '/api/consultations', '/api/assessments'], emailLimiter);

// MongoDB Connection with better error handling
const MONGODB_URI = process.env.MONGODB_URI;
const CONTENTFUL_USE = process.env.CONTENTFUL_USE === 'true';

console.log('📊 Environment:', process.env.NODE_ENV || 'development');
if (CONTENTFUL_USE && !MONGODB_URI) {
  console.log('ℹ️  CONTENTFUL_USE=true and no MONGODB_URI provided → skipping MongoDB connection for content read-only runtime.');
} else {
  if (!MONGODB_URI) {
    throw new AppError(
      ErrorTypes.DATABASE_ERROR,
      'MONGODB_URI is not defined in environment variables',
      500
    );
  }
  console.log('🔗 Connecting to MongoDB...');
  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4 // Force IPv4
  })
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
    console.log('📊 Database:', mongoose.connection.name);
    // Auto-seed blogs if collection is empty (non-destructive for existing data)
    const Blog = require('./models/Blog');
    Blog.estimatedDocumentCount().then(async (count) => {
      if (count === 0) {
        console.log('📝 No blogs found. Seeding sample blogs...');
        try {
          const sampleBlogs = require('./scripts/sampleBlogs');
          await Blog.insertMany(sampleBlogs);
          console.log(`✅ Seeded ${sampleBlogs.length} sample blogs`);
        } catch (seedErr) {
          console.error('⚠️  Failed to seed sample blogs:', seedErr);
        }
      }
    }).catch(err => console.error('Error checking blog count:', err));
  })
  .catch(err => {
    throw new AppError(
      ErrorTypes.DATABASE_ERROR,
      'Failed to connect to MongoDB',
      503,
      err
    );
  });
}

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
const newsRouter = require('./routes/news');
const testRouter = require('./routes/test');

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
app.use('/api/news', newsRouter);
app.use('/api/test', testRouter);
console.log('✅ All API routes configured');

// Health check endpoint with error handling
app.get('/api/health', asyncHandler(async (req, res) => {
  const dbReady = mongoose.connection.readyState === 1;
  if (!dbReady && !CONTENTFUL_USE) {
    throw new AppError(
      ErrorTypes.DATABASE_ERROR,
      'MongoDB connection is not ready',
      503
    );
  }

  res.json({
    status: 'OK',
    message: 'Maiya Hospital API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: CONTENTFUL_USE && !dbReady ? { status: 'skipped' } : {
      status: dbReady ? 'connected' : 'disconnected',
      name: dbReady ? mongoose.connection.name : undefined
    },
    security: {
      blockedRequests: securityMonitor.blockedRequests,
      rateLimitedRequests: securityMonitor.rateLimitedRequests,
      suspiciousActivities: securityMonitor.suspiciousActivities.length
    }
  });
}));

// Root endpoint with error handling
app.get('/', asyncHandler(async (req, res) => {
  res.json({
    message: 'Maiya Hospital API',
    status: 'Running',
    timestamp: new Date().toISOString(),
    docs: '/api/docs'
  });
}));

// 404 handler
app.use((req, res, next) => {
  next(new AppError(
    ErrorTypes.NOT_FOUND_ERROR,
    `Route ${req.method} ${req.url} not found`,
    404
  ));
});

// Error handling middleware
app.use(errorHandler);

// Start server with error handling
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`
🚀 Server running on port ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
🔒 Security features enabled:
   - Rate limiting
   - CORS protection
   - Helmet security headers
   - Request logging
   - Error handling
   - Security monitoring
📊 Health check: http://localhost:${PORT}/api/health
🌐 Root endpoint: http://localhost:${PORT}/
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});