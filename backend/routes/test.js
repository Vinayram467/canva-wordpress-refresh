const express = require('express');
const router = express.Router();
const { sendUserConfirmation, sendAdminNotification } = require('../services/emailService');
const { asyncHandler } = require('../middleware/errorHandler');

// Test email endpoint
router.post('/email', asyncHandler(async (req, res) => {
    console.log('Testing email service with config:', {
        EMAIL_HOST: process.env.EMAIL_HOST,
        EMAIL_PORT: process.env.EMAIL_PORT,
        EMAIL_USER: process.env.EMAIL_USER,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        // Not logging EMAIL_PASS for security
    });

    // Test data
    const testData = {
        patientName: 'Test User',
        email: 'social.maiya@gmail.com',
        phone: '+91 98450 12345',
        date: '2025-08-03',
        time: '10:00 AM',
        reason: 'Email Test'
    };

    // Send test emails
    const userResult = await sendUserConfirmation(testData, 'test');
    const adminResult = await sendAdminNotification(testData, 'test');

    res.json({
        success: true,
        message: 'Test emails sent',
        userEmail: {
            messageId: userResult.messageId,
            accepted: userResult.accepted,
            rejected: userResult.rejected
        },
        adminEmail: {
            messageId: adminResult.messageId,
            accepted: adminResult.accepted,
            rejected: adminResult.rejected
        }
    });
}));

module.exports = router;