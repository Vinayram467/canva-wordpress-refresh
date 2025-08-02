const nodemailer = require('nodemailer');
const crypto = require('crypto');
const emailStyles = require('./emailStyles');
const icons = require('./emailIcons');

// Security configurations and validation functions remain the same...
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

const generateSecureAppointmentConfirmationEmail = (data) => {
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
        <style>${emailStyles}</style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                ${icons.hospital}
                <h1>Maiya Multi Speciality Hospital</h1>
                <p>Appointment Request Confirmation</p>
            </div>
            
            <div class="content">
                <h2 class="greeting">Dear ${sanitizedData.patientName},</h2>
                
                <p style="font-size: 16px; line-height: 1.8;">
                    Thank you for choosing Maiya Multi Speciality Hospital. We have received your appointment request and our team will process it shortly.
                </p>
                
                <div class="details-box">
                    <h3>${icons.hospital} Appointment Details</h3>
                    
                    <div class="detail-row">
                        ${icons.user}
                        <div class="detail-content">
                            <strong>Patient Name</strong>
                            <span>${sanitizedData.patientName}</span>
                        </div>
                    </div>
                    
                    <div class="detail-row">
                        ${icons.email}
                        <div class="detail-content">
                            <strong>Email</strong>
                            <span>${sanitizedData.email}</span>
                        </div>
                    </div>
                    
                    <div class="detail-row">
                        ${icons.phone}
                        <div class="detail-content">
                            <strong>Phone</strong>
                            <span>${sanitizedData.phone}</span>
                        </div>
                    </div>
                    
                    <div class="detail-row">
                        ${icons.calendar}
                        <div class="detail-content">
                            <strong>Date</strong>
                            <span>${sanitizedData.date}</span>
                        </div>
                    </div>
                    
                    <div class="detail-row">
                        ${icons.time}
                        <div class="detail-content">
                            <strong>Time</strong>
                            <span>${sanitizedData.time}</span>
                        </div>
                    </div>
                    
                    ${sanitizedData.reason ? `
                    <div class="detail-row">
                        ${icons.notes}
                        <div class="detail-content">
                            <strong>Reason</strong>
                            <span>${sanitizedData.reason}</span>
                        </div>
                    </div>
                    ` : ''}
                </div>
                
                <div class="alert">
                    <h4>${icons.alert} Next Steps</h4>
                    <ul>
                        <li>Our team will review your request within 2-3 business days</li>
                        <li>You will receive a confirmation email once your appointment is confirmed</li>
                        <li>Please arrive 15 minutes before your scheduled time</li>
                    </ul>
                </div>

                <p style="font-size: 16px; margin: 20px 0; padding: 15px; background: rgba(16, 185, 129, 0.1); border-radius: 12px; border-left: 4px solid #10b981;">
                    For urgent medical concerns, please contact our emergency number: <strong>+91 98450 12345</strong>
                </p>
                
                <a href="https://maiyahospital.com" class="button">Visit Our Website</a>
            </div>
            
            <div class="footer">
                ${icons.hospital}
                <h3>Maiya Multi Speciality Hospital</h3>
                <div class="contact-info">
                    <div class="contact-item">
                        ${icons.location}
                        34, 10th Main Rd, Jayanagar 1st Block
                    </div>
                    <div class="contact-item">
                        ${icons.phone}
                        +91 98450 12345
                    </div>
                </div>
                <p>Bengaluru, Karnataka 560011</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Admin notification template with similar styling
const generateSecureAdminNotification = (data, formType) => {
  const sanitizedData = {};
  Object.keys(data).forEach(key => {
    sanitizedData[key] = sanitizeInput(data[key]);
  });

  const formattedDate = new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${emailStyles}</style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                ${icons.hospital}
                <h1>Maiya Multi Speciality Hospital</h1>
                <p>New ${formType} Submission</p>
            </div>
            
            <div class="content">
                <div class="details-box">
                    <h3>${icons.notes} Submission Information</h3>
                    
                    <div class="detail-row">
                        ${icons.calendar}
                        <div class="detail-content">
                            <strong>Submitted On</strong>
                            <span>${formattedDate}</span>
                        </div>
                    </div>
                    
                    <div class="detail-row">
                        ${icons.notes}
                        <div class="detail-content">
                            <strong>Form Type</strong>
                            <span>${formType}</span>
                        </div>
                    </div>
                    
                    <div class="detail-row">
                        ${icons.notes}
                        <div class="detail-content">
                            <strong>Reference ID</strong>
                            <span>${crypto.randomBytes(8).toString('hex')}</span>
                        </div>
                    </div>
                </div>

                <div class="details-box">
                    <h3>${icons.user} User Details</h3>
                    ${Object.entries(sanitizedData).map(([key, value]) => `
                        <div class="detail-row">
                            ${icons.notes}
                            <div class="detail-content">
                                <strong>${key}</strong>
                                <span>${value}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <a href="https://admin.maiyahospital.com/dashboard" class="button">View in Dashboard</a>
            </div>
            
            <div class="footer">
                ${icons.hospital}
                <h3>Maiya Multi Speciality Hospital - Admin Portal</h3>
                <p style="color: #666;">This is an automated notification. Please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Email service functions remain the same...
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

const sendUserConfirmation = async (data, formType) => {
  try {
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
        emailHtml = generateSecureContactConfirmationEmail(data);
        subject = 'Message Received - Maiya Hospital';
        break;
      case 'consultation':
        emailHtml = generateSecureContactConfirmationEmail(data);
        subject = 'Virtual Consultation Request - Maiya Hospital';
        break;
      case 'assessment':
        emailHtml = generateSecureContactConfirmationEmail(data);
        subject = 'Health Assessment Submission - Maiya Hospital';
        break;
      default:
        emailHtml = generateSecureAppointmentConfirmationEmail(data);
        subject = `${formType.charAt(0).toUpperCase() + formType.slice(1)} Confirmation - Maiya Hospital`;
    }
    
    const transporter = createSecureTransport();
    await transporter.verify();
    
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
    return result;
  } catch (error) {
    console.error('Error sending user confirmation:', error);
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
    
    const transporter = createSecureTransport();
    await transporter.verify();
    
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
    return result;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    throw error;
  }
};

module.exports = {
  sendUserConfirmation,
  sendAdminNotification,
  validateEmail,
  sanitizeInput
};