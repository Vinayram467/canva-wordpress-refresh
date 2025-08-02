const nodemailer = require('nodemailer');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');

// Security configurations
const SECURITY_CONFIG = {
  MAX_EMAILS_PER_HOUR: 50,
  MAX_EMAILS_PER_DAY: 200,
  EMAIL_SIZE_LIMIT: 1024 * 1024, // 1MB
  ALLOWED_EMAIL_DOMAINS: ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'],
  BLOCKED_WORDS: [
    'script', 'javascript:', 'onload', 'onerror', 'eval', 'expression',
    'vbscript:', 'data:', 'iframe', 'object', 'embed', 'base64',
    'document.cookie', 'window.location', 'alert(', 'confirm(',
    'prompt(', 'setTimeout', 'setInterval', 'Function('
  ],
  MAX_RECIPIENTS: 2,
  EMAIL_TIMEOUT: 30000, // 30 seconds
  MAX_EMAIL_LENGTH: 50000, // 50KB
  ALLOWED_HTML_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
};

// Rate limiting storage (in production, use Redis)
const emailCounts = new Map();

// Input validation and sanitization
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  // Remove potentially dangerous content
  let sanitized = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/eval\s*\(/gi, '')
    .replace(/expression\s*\(/gi, '')
    .trim();
  
  // Limit length
  if (sanitized.length > 1000) {
    sanitized = sanitized.substring(0, 1000) + '...';
  }
  
  return sanitized;
};

// Validate email format and domain
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  const domain = email.split('@')[1];
  return SECURITY_CONFIG.ALLOWED_EMAIL_DOMAINS.includes(domain);
};

// Check for blocked content
const containsBlockedContent = (text) => {
  const lowerText = text.toLowerCase();
  return SECURITY_CONFIG.BLOCKED_WORDS.some(word => lowerText.includes(word));
};

// Rate limiting check
const checkRateLimit = (email) => {
  const now = Date.now();
  const hourAgo = now - 60 * 60 * 1000;
  const dayAgo = now - 24 * 60 * 60 * 1000;
  
  if (!emailCounts.has(email)) {
    emailCounts.set(email, { hourly: [], daily: [] });
  }
  
  const counts = emailCounts.get(email);
  
  // Clean old entries
  counts.hourly = counts.hourly.filter(time => time > hourAgo);
  counts.daily = counts.daily.filter(time => time > dayAgo);
  
  // Check limits
  if (counts.hourly.length >= SECURITY_CONFIG.MAX_EMAILS_PER_HOUR) {
    throw new Error('Rate limit exceeded: too many emails per hour');
  }
  
  if (counts.daily.length >= SECURITY_CONFIG.MAX_EMAILS_PER_DAY) {
    throw new Error('Rate limit exceeded: too many emails per day');
  }
  
  // Add current request
  counts.hourly.push(now);
  counts.daily.push(now);
};

// Create secure transporter with additional security options
const createSecureTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // Use STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    // Security options
    tls: {
      rejectUnauthorized: true,
      ciphers: 'SSLv3'
    },
    // Timeout settings
    connectionTimeout: SECURITY_CONFIG.EMAIL_TIMEOUT,
    greetingTimeout: SECURITY_CONFIG.EMAIL_TIMEOUT,
    socketTimeout: SECURITY_CONFIG.EMAIL_TIMEOUT,
    // Rate limiting
    maxConnections: 5,
    maxMessages: 100,
    // Security headers
    disableFileAccess: true,
    disableUrlAccess: true
  });
};

// Secure email sending function
const sendSecureEmail = async (to, subject, html, options = {}) => {
  try {
    // Validate inputs
    if (!to || !Array.isArray(to) || to.length === 0) {
      throw new Error('Invalid recipient list');
    }
    
    if (to.length > SECURITY_CONFIG.MAX_RECIPIENTS) {
      throw new Error('Too many recipients');
    }
    
    // Validate each email
    for (const email of to) {
      if (!validateEmail(email)) {
        throw new Error(`Invalid email format: ${email}`);
      }
    }
    
    // Check rate limits for each recipient
    for (const email of to) {
      checkRateLimit(email);
    }
    
    // Sanitize subject and content
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedHtml = sanitizeInput(html);
    
    // Check for blocked content
    if (containsBlockedContent(sanitizedSubject) || containsBlockedContent(sanitizedHtml)) {
      throw new Error('Email contains blocked content');
    }
    
    // Create secure transporter
    const transporter = createSecureTransporter();
    
    // Verify connection
    await transporter.verify();
    
    // Send email with security headers
    const mailOptions = {
      from: `"${process.env.HOSPITAL_NAME}" <${process.env.EMAIL_USER}>`,
      to: to.join(', '),
      subject: sanitizedSubject,
      html: sanitizedHtml,
      headers: {
        'X-Mailer': 'Maiya Hospital Email System',
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'X-Report-Abuse': 'Please report abuse to abuse@maiyahospital.com',
        'List-Unsubscribe': '<mailto:unsubscribe@maiyahospital.com>',
        'Precedence': 'bulk'
      },
      // Security options
      disableFileAccess: true,
      disableUrlAccess: true,
      ...options
    };
    
    const result = await transporter.sendMail(mailOptions);
    
    // Log successful email (without sensitive data)
    console.log(`Email sent successfully to ${to.length} recipient(s)`);
    
    return result;
    
  } catch (error) {
    console.error('Email sending failed:', error.message);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

// Secure email templates with additional sanitization
const generateSecureAppointmentConfirmationEmail = (data) => {
  // Sanitize all data
  const sanitizedData = {
    patientName: sanitizeInput(data.patientName || data.name || ''),
    email: sanitizeInput(data.email || data.patientEmail || ''),
    phone: sanitizeInput(data.phone || data.patientPhone || ''),
    date: sanitizeInput(data.date || data.appointmentDate || ''),
    time: sanitizeInput(data.time || data.appointmentTime || ''),
    reason: sanitizeInput(data.reason || '')
  };
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'unsafe-inline';">
    <title>Appointment Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10b981, #ef4444); color: white; padding: 30px; text-align: center; border-radius: 10px;">
            <h1 style="margin: 0; font-size: 24px;">Maiya Multi Speciality Hospital</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Appointment Request Received</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px;">
            <h2 style="color: #10b981; margin-top: 0;">Dear ${sanitizedData.patientName},</h2>
            
            <p>Thank you for booking an appointment with Maiya Multi Speciality Hospital. We have received your appointment request and our team will review it shortly.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                <h3 style="margin-top: 0; color: #10b981;">Appointment Details:</h3>
                <p><strong>Name:</strong> ${sanitizedData.patientName}</p>
                <p><strong>Email:</strong> ${sanitizedData.email}</p>
                <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
                <p><strong>Date:</strong> ${sanitizedData.date}</p>
                <p><strong>Time:</strong> ${sanitizedData.time}</p>
                ${sanitizedData.reason ? `<p><strong>Reason:</strong> ${sanitizedData.reason}</p>` : ''}
            </div>
            
            <p>We will contact you within 24 hours to confirm your appointment. If you have any urgent medical concerns, please call our emergency number: <strong>+91 98450 12345</strong></p>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Important:</strong> Please arrive 15 minutes before your scheduled appointment time.</p>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
            <p>Maiya Multi Speciality Hospital<br>
            34, 10th Main Rd, Jayanagar 1st Block<br>
            Bengaluru, Karnataka 560011<br>
            Emergency: +91 98450 12345</p>
        </div>
    </div>
</body>
</html>
`;
};

// Similar secure templates for other email types...
const generateSecureContactConfirmationEmail = (data) => {
  const sanitizedData = {
    firstName: sanitizeInput(data.firstName || ''),
    lastName: sanitizeInput(data.lastName || ''),
    email: sanitizeInput(data.email || ''),
    phone: sanitizeInput(data.phone || ''),
    subject: sanitizeInput(data.subject || 'General Inquiry'),
    message: sanitizeInput(data.message || '')
  };
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'unsafe-inline';">
    <title>Message Received</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10b981, #ef4444); color: white; padding: 30px; text-align: center; border-radius: 10px;">
            <h1 style="margin: 0; font-size: 24px;">Maiya Multi Speciality Hospital</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Message Received</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px;">
            <h2 style="color: #10b981; margin-top: 0;">Dear ${sanitizedData.firstName} ${sanitizedData.lastName},</h2>
            
            <p>Thank you for contacting Maiya Multi Speciality Hospital. We have received your message and our team will get back to you within 24 hours.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                <h3 style="margin-top: 0; color: #10b981;">Message Details:</h3>
                <p><strong>Name:</strong> ${sanitizedData.firstName} ${sanitizedData.lastName}</p>
                <p><strong>Email:</strong> ${sanitizedData.email}</p>
                <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
                <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
                <p><strong>Message:</strong> ${sanitizedData.message}</p>
            </div>
            
            <p>For urgent medical concerns, please call our emergency number: <strong>+91 98450 12345</strong></p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
            <p>Maiya Multi Speciality Hospital<br>
            34, 10th Main Rd, Jayanagar 1st Block<br>
            Bengaluru, Karnataka 560011<br>
            Emergency: +91 98450 12345</p>
        </div>
    </div>
</body>
</html>
`;
};

// Admin notification templates (simplified for security)
const generateSecureAdminNotification = (data, formType) => {
  const sanitizedData = {};
  
  // Sanitize all data fields
  Object.keys(data).forEach(key => {
    sanitizedData[key] = sanitizeInput(data[key]);
  });
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'unsafe-inline';">
    <title>New ${formType} Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #10b981, #ef4444); color: white; padding: 30px; text-align: center; border-radius: 10px;">
            <h1 style="margin: 0; font-size: 24px;">Maiya Multi Speciality Hospital</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">New ${formType} Submission</p>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px;">
            <h2 style="color: #10b981; margin-top: 0;">New ${formType} Request</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                <h3 style="margin-top: 0; color: #10b981;">Submission Details:</h3>
                ${Object.entries(sanitizedData).map(([key, value]) => 
                  `<p><strong>${key}:</strong> ${value}</p>`
                ).join('')}
            </div>
            
            <p><strong>Submission Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
            <p>Maiya Multi Speciality Hospital<br>
            Admin Notification System</p>
        </div>
    </div>
</body>
</html>
`;
};

// Main email service functions
const sendUserConfirmation = async (data, formType) => {
  try {
    const userEmail = data.email || data.patientEmail;
    
    if (!validateEmail(userEmail)) {
      throw new Error('Invalid user email address');
    }
    
    let emailHtml;
    let subject;
    
    switch (formType) {
      case 'appointment':
        emailHtml = generateSecureAppointmentConfirmationEmail(data);
        subject = 'Appointment Request Confirmation - Maiya Hospital';
        break;
      case 'contact':
        emailHtml = generateSecureContactConfirmationEmail(data);
        subject = 'Message Received - Maiya Hospital';
        break;
      case 'consultation':
        emailHtml = generateSecureContactConfirmationEmail(data);
        subject = 'Virtual Consultation Request Confirmation - Maiya Hospital';
        break;
      case 'assessment':
        emailHtml = generateSecureContactConfirmationEmail(data);
        subject = 'Health Assessment Submission Confirmation - Maiya Hospital';
        break;
      default:
        throw new Error('Invalid form type');
    }
    
    await sendSecureEmail([userEmail], subject, emailHtml);
    
  } catch (error) {
    console.error('Error sending user confirmation:', error.message);
    throw error;
  }
};

const sendAdminNotification = async (data, formType) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!validateEmail(adminEmail)) {
      throw new Error('Invalid admin email address');
    }
    
    const emailHtml = generateSecureAdminNotification(data, formType);
    const subject = `New ${formType} Submission - Maiya Hospital`;
    
    await sendSecureEmail([adminEmail], subject, emailHtml);
    
  } catch (error) {
    console.error('Error sending admin notification:', error.message);
    throw error;
  }
};

// Security monitoring
const getEmailStats = () => {
  const stats = {
    totalEmails: 0,
    rateLimitedEmails: 0,
    blockedEmails: 0,
    activeConnections: 0
  };
  
  emailCounts.forEach((counts, email) => {
    stats.totalEmails += counts.daily.length;
  });
  
  return stats;
};

// Clean up old rate limit data (run periodically)
const cleanupRateLimits = () => {
  const now = Date.now();
  const dayAgo = now - 24 * 60 * 60 * 1000;
  
  emailCounts.forEach((counts, email) => {
    counts.daily = counts.daily.filter(time => time > dayAgo);
    if (counts.daily.length === 0 && counts.hourly.length === 0) {
      emailCounts.delete(email);
    }
  });
};

// Run cleanup every hour
setInterval(cleanupRateLimits, 60 * 60 * 1000);

module.exports = {
  sendUserConfirmation,
  sendAdminNotification,
  sendSecureEmail,
  validateEmail,
  sanitizeInput,
  getEmailStats,
  SECURITY_CONFIG
}; 