const express = require('express');
const emailService = require('./services/emailService');

const app = express();
app.use(express.json());

// Test endpoint that simulates the appointment form submission
app.post('/api/test-appointment-workflow', async (req, res) => {
  try {
    console.log('📝 Received test appointment data:', req.body);
    
    // Map frontend field names to backend expected names (same as in appointments.js)
    const appointmentData = {
      patientName: req.body.patientName || req.body.name || '',
      email: req.body.email || req.body.patientEmail || req.body.userEmail || '',
      phone: req.body.phone || req.body.patientPhone || req.body.userPhone || '',
      date: req.body.date || req.body.appointmentDate || '',
      time: req.body.time || req.body.appointmentTime || '',
      reason: req.body.reason || req.body.message || '',
      doctorId: req.body.doctorId || '',
      status: req.body.status || 'pending',
      isUrgent: req.body.isUrgent || false,
      notes: req.body.notes || ''
    };
    
    console.log('📧 Mapped appointment data:', appointmentData);
    console.log('📧 Email field:', appointmentData.email);
    
    if (!appointmentData.email) {
      return res.status(400).json({
        success: false,
        message: 'Email field is required',
        receivedData: req.body,
        mappedData: appointmentData
      });
    }
    
    // Test email service
    try {
      console.log('📤 Testing user confirmation email...');
      await emailService.sendUserConfirmation(appointmentData, 'appointment');
      console.log('✅ User confirmation email sent successfully');
      
      console.log('📤 Testing admin notification email...');
      await emailService.sendAdminNotification(appointmentData, 'appointment');
      console.log('✅ Admin notification email sent successfully');
      
      res.json({
        success: true,
        message: 'Email workflow test successful',
        data: appointmentData
      });
    } catch (emailError) {
      console.error('❌ Email test failed:', emailError);
      res.status(500).json({
        success: false,
        message: 'Email workflow test failed',
        error: emailError.message,
        data: appointmentData
      });
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
    res.status(500).json({
      success: false,
      message: 'Test failed',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🧪 Email workflow test server running on port ${PORT}`);
  console.log(`📝 Test endpoint: POST http://localhost:${PORT}/api/test-appointment-workflow`);
  
  // Test with sample data
  setTimeout(() => {
    const testData = {
      patientName: 'Test Patient',
      patientEmail: 'test@example.com',
      patientPhone: '+91 98765 43210',
      appointmentDate: '2024-01-15',
      appointmentTime: '10:00 AM',
      reason: 'General consultation'
    };
    
    fetch(`http://localhost:${PORT}/api/test-appointment-workflow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('✅ Test result:', data);
    })
    .catch(error => {
      console.error('❌ Test failed:', error);
    });
  }, 2000);
}); 