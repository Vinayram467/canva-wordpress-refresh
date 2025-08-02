const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { AppError, ErrorTypes } = require('../middleware/errorHandler');
const { validateEmail } = require('../security/securityMiddleware');

// Keep all the existing ICONS and styles...

const createSecureTransport = () => {
  try {
    console.log('Creating email transport with config:', {
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      user: process.env.EMAIL_USER,
      secure: false
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new AppError(
        ErrorTypes.EMAIL_ERROR,
        'Missing email credentials in environment variables',
        500
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: true,
        ciphers: 'SSLv3'
      },
      debug: true,
      logger: true
    });

    return transporter;
  } catch (error) {
    console.error('Error creating email transport:', error);
    throw new AppError(
      ErrorTypes.EMAIL_ERROR,
      'Failed to create email transport',
      500,
      error
    );
  }
};

// Keep the rest of the email service code the same...

module.exports = {
  sendUserConfirmation,
  sendAdminNotification,
  sanitizeInput
};