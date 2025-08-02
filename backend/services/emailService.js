const nodemailer = require('nodemailer');
const crypto = require('crypto');
const emailStyles = require('./emailStyles');
const icons = require('./emailIcons');

// Security configurations
const SECURITY_CONFIG = {
  MAX_EMAILS_PER_HOUR: 50,
  MAX_EMAILS_PER_DAY: 200,
  EMAIL_SIZE_LIMIT: 1024 * 1024,
  ALLOWED_EMAIL_DOMAINS: ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'],
  BLOCKED_WORDS: [
    'script', 'javascript:', 'onload', 'onerror', 'eval', 'expression',
    'vbscript:', 'data:', 'iframe', 'object', 'embed', 'base64',
    'document.cookie', 'window.location', 'alert(', 'confirm(',
    'prompt(', 'setTimeout', 'setInterval', 'Function('
  ],
  MAX_RECIPIENTS: 2,
  EMAIL_TIMEOUT: 30000,
  MAX_EMAIL_LENGTH: 50000
};

// Validation functions
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  let sanitized = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/eval\s*\(/gi, '')
    .replace(/expression\s*\(/gi, '')
    .trim();
  
  if (sanitized.length > 1000) {
    sanitized = sanitized.substring(0, 1000) + '...';
  }
  return sanitized;
};

const validateEmail = (email) => {
  try {
    console.log('Validating email:', email);
    
    if (!email || typeof email !== 'string') {
      console.log('Email is invalid: empty or not a string');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Email failed regex validation');
      return false;
    }
    
    const domain = email.split('@')[1];
    console.log('Email domain:', domain);
    
    // In development, accept all domains
    if (process.env.NODE_ENV !== 'production') {
      console.log('Development mode: accepting all domains');
      return true;
    }
    
    const isAllowed = SECURITY_CONFIG.ALLOWED_EMAIL_DOMAINS.includes(domain);
    console.log('Domain allowed:', isAllowed);
    return isAllowed;
  } catch (error) {
    console.error('Error in validateEmail:', error);
    return false;
  }
};

// Create secure transporter
const createSecureTransport = () => {
  const transportConfig = {
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
    }
  };

  console.log('Creating transport with config:', {
    host: transportConfig.host,
    port: transportConfig.port,
    user: transportConfig.auth.user,
    // Not logging password for security
  });

  return nodemailer.createTransport(transportConfig);
};

// Generate email templates
const generateSecureAppointmentConfirmationEmail = (data) => {
  // ... keep existing template generation code ...
};

const generateSecureAdminNotification = (data, formType) => {
  // ... keep existing template generation code ...
};

// Main email sending functions
const sendUserConfirmation = async (data, formType) => {
  try {
    console.log('Starting sendUserConfirmation with:', { formType });
    const userEmail = data.email || data.patientEmail;
    console.log('User email:', userEmail);
    
    if (!validateEmail(userEmail)) {
      throw new Error(`Invalid user email address: ${userEmail}`);
    }
    
    let emailHtml;
    let subject;
    
    switch (formType.toLowerCase()) {
      case 'appointment':
        emailHtml = generateSecureAppointmentConfirmationEmail(data);
        subject = 'Appointment Request Confirmation - Maiya Hospital';
        break;
      case 'contact':
        emailHtml = generateSecureAppointmentConfirmationEmail(data);
        subject = 'Message Received - Maiya Hospital';
        break;
      case 'consultation':
        emailHtml = generateSecureAppointmentConfirmationEmail(data);
        subject = 'Virtual Consultation Request - Maiya Hospital';
        break;
      case 'assessment':
        emailHtml = generateSecureAppointmentConfirmationEmail(data);
        subject = 'Health Assessment Submission - Maiya Hospital';
        break;
      default:
        emailHtml = generateSecureAppointmentConfirmationEmail(data);
        subject = `${formType.charAt(0).toUpperCase() + formType.slice(1)} Confirmation - Maiya Hospital`;
    }
    
    console.log('Creating transport...');
    const transporter = createSecureTransport();
    console.log('Verifying transport...');
    await transporter.verify();
    
    console.log('Sending email to:', userEmail);
    const mailOptions = {
      from: `"Maiya Multi Speciality Hospital" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: subject,
      html: emailHtml,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'X-Mailer': 'Maiya Hospital Email System'
      }
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error in sendUserConfirmation:', error);
    throw error;
  }
};

const sendAdminNotification = async (data, formType) => {
  try {
    console.log('Starting sendAdminNotification with:', { formType });
    const adminEmail = process.env.ADMIN_EMAIL;
    console.log('Admin email:', adminEmail);
    
    if (!adminEmail) {
      throw new Error('ADMIN_EMAIL environment variable is not set');
    }
    
    if (!validateEmail(adminEmail)) {
      throw new Error(`Invalid admin email address: ${adminEmail}`);
    }
    
    const emailHtml = generateSecureAdminNotification(data, formType);
    const subject = `New ${formType} Submission - Maiya Hospital`;
    
    console.log('Creating transport...');
    const transporter = createSecureTransport();
    console.log('Verifying transport...');
    await transporter.verify();
    
    console.log('Sending admin notification to:', adminEmail);
    const mailOptions = {
      from: `"Maiya Hospital System" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: subject,
      html: emailHtml,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'X-Mailer': 'Maiya Hospital Admin Notification System'
      }
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Admin notification sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error in sendAdminNotification:', error);
    throw error;
  }
};

// Export all necessary functions
module.exports = {
  sendUserConfirmation,
  sendAdminNotification,
  validateEmail,
  sanitizeInput
};