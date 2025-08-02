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
  errorHandler,
  securityMonitor,
  SECURITY_CONFIG
} = require('./security/securityMiddleware');

const app = express();

// Trust proxy - required for rate limiting behind reverse proxies
app.set('trust proxy', 1);

// Basic middleware
app.use(helmet(helmetConfig));
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(requestLogger);

// Apply rate limiting
app.use('/api/', apiLimiter);
app.use(['/api/appointments', '/api/messages', '/api/consultations', '/api/assessments'], emailLimiter);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

console.log('🔗 Connecting to MongoDB...');
console.log('📊 Environment:', process.env.NODE_ENV || 'development');

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4 // Force IPv4
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
  console.log('📊 Database:', mongoose.connection.name);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Maiya Hospital API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    security: {
      blockedRequests: securityMonitor.blockedRequests,
      rateLimitedRequests: securityMonitor.rateLimitedRequests,
      suspiciousActivities: securityMonitor.suspiciousActivities.length
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Maiya Hospital API',
    status: 'Running',
    timestamp: new Date().toISOString(),
    docs: '/api/docs'
  });
});

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
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