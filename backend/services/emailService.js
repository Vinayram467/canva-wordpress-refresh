const nodemailer = require('nodemailer');
const crypto = require('crypto');
const emailStyles = require('./emailStyles');
const icons = require('./emailIcons');

// Security configurations
const SECURITY_CONFIG = {
  // ... existing config ...
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
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  const domain = email.split('@')[1];
  return SECURITY_CONFIG.ALLOWED_EMAIL_DOMAINS.includes(domain);
};

// Create secure transporter
const createSecureTransport = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: true,
      ciphers: 'SSLv3'
    }
  });
};

// Generate email templates
const generateSecureAppointmentConfirmationEmail = (data) => {
  // ... existing template generation code ...
};

const generateSecureAdminNotification = (data, formType) => {
  // ... existing template generation code ...
};

// Main email sending functions
const sendUserConfirmation = async (data, formType) => {
  try {
    console.log('Starting sendUserConfirmation with:', { formType });
    const userEmail = data.email || data.patientEmail;
    
    if (!validateEmail(userEmail)) {
      throw new Error('Invalid user email address');
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
    
    if (!validateEmail(adminEmail)) {
      throw new Error('Invalid admin email address');
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
  sendUserConfirmation: sendUserConfirmation,
  sendAdminNotification: sendAdminNotification,
  validateEmail: validateEmail,
  sanitizeInput: sanitizeInput
};