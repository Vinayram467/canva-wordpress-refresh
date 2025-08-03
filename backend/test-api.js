const express = require('express');
const app = express();

// Basic middleware
app.use(express.json());

// Test endpoint
app.post('/api/test-appointment', async (req, res) => {
  try {
    console.log('📝 Received appointment request:', req.body);
    
    // Simulate email sending
    console.log('📧 Would send confirmation email to:', req.body.email);
    console.log('📧 Would send notification to admin');
    
    res.status(201).json({
      success: true,
      message: 'Appointment request received successfully',
      data: req.body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error processing appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing appointment request',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Test API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Test appointment: POST http://localhost:${PORT}/api/test-appointment`);
});

// Test the appointment endpoint
setTimeout(() => {
  const testData = {
    patientName: 'Test Patient',
    email: 'test@example.com',
    phone: '+91 98765 43210',
    date: '2024-01-15',
    time: '10:00 AM',
    reason: 'General consultation'
  };

  fetch(`http://localhost:${PORT}/api/test-appointment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('✅ Test appointment request successful:', data);
  })
  .catch(error => {
    console.error('❌ Test appointment request failed:', error);
  });
}, 2000); 