const express = require('express');
const emailService = require('../services/emailService');
const router = express.Router();

// Test email service
router.post('/test', async (req, res) => {
  try {
    const testData = {
      patientName: 'Test Patient',
      email: 'test@example.com',
      phone: '+91 9876543210',
      date: '2024-01-15',
      time: '10:00 AM',
      reason: 'General checkup'
    };

    // Test user confirmation email
    await emailService.sendUserConfirmation(testData, 'appointment');
    console.log('Test user email sent successfully');

    // Test admin notification email
    await emailService.sendAdminNotification(testData, 'appointment');
    console.log('Test admin email sent successfully');

    res.json({ 
      success: true, 
      message: 'Test emails sent successfully. Check your email inbox.' 
    });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send test emails',
      error: error.message 
    });
  }
});

// Test email connection
router.get('/connection', async (req, res) => {
  try {
    const isConnected = await emailService.testConnection();
    if (isConnected) {
      res.json({ 
        success: true, 
        message: 'Email service connection successful' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Email service connection failed' 
      });
    }
  } catch (error) {
    console.error('Connection test error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Email service connection test failed',
      error: error.message 
    });
  }
});

module.exports = router; 