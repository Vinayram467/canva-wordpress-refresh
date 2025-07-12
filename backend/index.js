const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/miaya-hospital';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

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

// Use routes
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Miaya Hospital API is running',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Test working' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
}); 