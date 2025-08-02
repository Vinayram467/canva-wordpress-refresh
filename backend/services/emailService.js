const nodemailer = require('nodemailer');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');

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
  MAX_EMAIL_LENGTH: 50000,
  ALLOWED_HTML_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
};

// Input validation and sanitization functions remain the same...
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

// Common CSS styles for emails
const emailStyles = `
  /* Base styles */
  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  .header {
    background: linear-gradient(135deg, #10b981, #ef4444);
    color: white;
    padding: 30px;
    text-align: center;
    border-radius: 10px 10px 0 0;
  }
  .logo {
    width: 150px;
    height: auto;
    margin-bottom: 20px;
  }
  .content {
    padding: 30px;
    background: #ffffff;
  }
  .details-box {
    background: #f8f9fa;
    border-left: 4px solid #10b981;
    padding: 20px;
    margin: 20px 0;
    border-radius: 5px;
  }
  .footer {
    text-align: center;
    padding: 20px;
    color: #666;
    font-size: 14px;
    background: #f8f9fa;
    border-radius: 0 0 10px 10px;
  }
  .button {
    display: inline-block;
    padding: 12px 24px;
    background: #10b981;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    margin: 20px 0;
    text-align: center;
  }
  .icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 8px;
  }
  .alert {
    background: #fff3cd;
    border: 1px solid #ffeeba;
    padding: 15px;
    border-radius: 5px;
    margin: 20px 0;
  }
`;

// Base64 encoded icons (you can replace these with your own icons)
const icons = {
  hospital: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAA70lEQVRIie2WQQ6CMBREn8bEhJ0LPYjxHm48AZ5DT+RajyBrE+PCYGlpO0Bb3MC/aUmH92c6P0OFv6AG2kBbvXr+qjMQrbUBLkCnrxH4kHQvCW6AK7CJ1AZgL2mcE+wK+wgDnCXd5gZbWFJ4LGrbekrBlzlOKfgI3B0/B8s2d8BxLngDPBw/Z+AU+A0wWL424oQkdQCSBklD4HxJUu/Z74Yc8MHzdQIOkrrc4AZ4AtsP/d4kPXOCW+DpeFeHpJgTfPrS7yBp9HyVghugD5w3SS3wkDTlBFdoXvAMHIEtsEvpLHBs1TSw9pXVwMqXVuEbeAHhV6ZqjxQmVQAAAABJRU5ErkJggg==',
  email: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABxUlEQVRIie2WPWsUURSGn3NnN2EVxGR3ZhYTEQVFVBAs/AHaWPkDLK0EK0G0tLGxFaz8C/4AG8FCrEQUJH4giB+VJsYYN7uZHYtZYVzdnbkzCQh54XKHc+557nv3zj0DK1reMuuOXS84am4YeaZGbyZwZOTLzPqsOdQFrwNmxq8u+Fxk5Fxk5FJkZDKy8nFk5Vdk5UNkZTKycnNk5WBkZTAy0hcZeRYZ+RkZ+RFZeRhZ6Y2MXAZ+R0Z+9Y2c7/R6/2xk5WJk5X1kZDwy8jWycrZvZPSIlTtADfSrWu/2jbzqGzkRGRmNrLyLrExEVl5GVk5GRp5EVr5FVj5HVh5FRgYiK7d6kCPAG+A0sNsY2QqsW+TQj8AzY+TQf+B1wFNj5PB/4EngsQFOLQVPADXGOLFU+MES4Z4xnr9njJwB3gLbgV3GyFpj5C7wYiH4lzFytW9kY2TkQWTlUWTlUWTlRWTlmjFyEHhvjHwHNhkjp4CXQB/YY4ysNUb2L3RxbwKbgb3GyDAwBmwzRnqNkRvA9fngnwXeCJwDhowxAJuAd8bIxIIxrfU4MAmglEoB0ul0plzXnQVQSk0DKK3TnPNMaa2V1vq367rT7Xb7Zx73L9Ef4UKqRMh9wEAAAAAASUVORK5CYII=',
  phone: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABYklEQVRIie2WTU4CQRCFv2o2xoULZeENvIBewcQjeAIv4EbjQaYxcdyyZaExIWHlIZgYb8DCrWFBhenlp2cGJvElvV2/qqnu6reqoaOOFkoBVAocqvhngfmKfxn4UPFHwLmKPwBuVPwecKviFzXBY+AJmNQEPwP3wF5N8CNwBwzXBb8Bt8CgDvgVuAH6dcCvwDXQqwN+Bi6BnTrgKXABdOuAn4AzoKPm7wEXSqkDrfUXsFBKHWmtZ8AcWGqtj7XWM2AOLLTWx1rrGTAHllrrI631DJgDC631sdb6C1gopQ601l/AQil1qLWeAXOl1L7W+hOYK6UOtNZfwEIpdaS1ngFzYKm1PtZaz4A5sNRaH2utZ8AcWGqtj7TWM2CulDrQWn8BC6XUodb6C5grpfa11p/AXCl1oLX+AhZKqSOt9QyYA0ut9bHWegbMlVIHWusvYKGUOtRafwFzpdS+1voTmGutD7TWM2CulNrXWn8C/0Z/AK8p1meaU/YuAAAAAElFTkSuQmCC',
  location: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABz0lEQVRIie2WPWsUURSGn3NnN2EVxGR3ZhYTEQVFVBAs/AHaWPkDLK0EK0G0tLGxFaz8C/4AG8FCrEQUJH4giB+VJsYYN7uZHYtZYVzdnbkzCQh54XKHc+557nv3zj0DK1reMuuOXS84am4YeaZGbyZwZOTLzPqsOdQFrwNmxq8u+Fxk5Fxk5FJkZDKy8nFk5VdkZDKycnNk5WBkZTAy0hcZeRYZ+RkZ+RFZeRhZ6Y2MXAZ+R0Z+9Y2c7/R6/2xk5WJk5X1kZDwy8jWycrZvZPSIlTtADfSrWu/2jbzqGzkRGRmNrLyLrExEVl5GVk5GRp5EVr5FVj5HVh5FRgYiK7d6kCPAG+A0sNsY2QqsW+TQj8AzY+TQf+B1wFNj5PB/4EngsQFOLQVPADXGOLFU+MES4Z4xnr9njJwB3gLbgV3GyFpj5C7wYiH4lzFytW9kY2TkQWTlUWTlUWTlRWTlmjFyEHhvjHwHNhkjp4CXQB/YY4ysNUb2L3RxbwKbgb3GyDAwBmwzRnqNkRvA9fngnwXeCJwDhowxAJuAd8bIxIIxrfU4MAmglEoB0ul0plzXnQVQSk0DKK3TnPNMaa2V1vq367rT7Xb7Zx73L9Ef4UKqRMh9wEAAAAAASUVORK5CYII='
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
                <img src="${icons.hospital}" alt="Hospital Icon" class="logo">
                <h1>Maiya Multi Speciality Hospital</h1>
                <p>Appointment Request Confirmation</p>
            </div>
            
            <div class="content">
                <h2 style="color: #10b981;">Dear ${sanitizedData.patientName},</h2>
                
                <p>Thank you for choosing Maiya Multi Speciality Hospital. We have received your appointment request and our team will process it shortly.</p>
                
                <div class="details-box">
                    <h3 style="color: #10b981; margin-top: 0;">Appointment Details:</h3>
                    <p><img src="${icons.hospital}" alt="Patient" class="icon"> <strong>Patient Name:</strong> ${sanitizedData.patientName}</p>
                    <p><img src="${icons.email}" alt="Email" class="icon"> <strong>Email:</strong> ${sanitizedData.email}</p>
                    <p><img src="${icons.phone}" alt="Phone" class="icon"> <strong>Phone:</strong> ${sanitizedData.phone}</p>
                    <p><img src="${icons.hospital}" alt="Calendar" class="icon"> <strong>Date:</strong> ${sanitizedData.date}</p>
                    <p><img src="${icons.hospital}" alt="Time" class="icon"> <strong>Time:</strong> ${sanitizedData.time}</p>
                    ${sanitizedData.reason ? `<p><strong>Reason:</strong> ${sanitizedData.reason}</p>` : ''}
                </div>
                
                <div class="alert">
                    <p><strong>Next Steps:</strong></p>
                    <ul>
                        <li>Our team will review your request within 2-3 business days</li>
                        <li>You will receive a confirmation email once your appointment is confirmed</li>
                        <li>Please arrive 15 minutes before your scheduled time</li>
                    </ul>
                </div>

                <p>For urgent medical concerns, please contact our emergency number: <strong>+91 98450 12345</strong></p>
                
                <a href="https://maiyahospital.com" class="button">Visit Our Website</a>
            </div>
            
            <div class="footer">
                <p><strong>Maiya Multi Speciality Hospital</strong></p>
                <p><img src="${icons.location}" alt="Location" class="icon"> 34, 10th Main Rd, Jayanagar 1st Block</p>
                <p>Bengaluru, Karnataka 560011</p>
                <p><img src="${icons.phone}" alt="Phone" class="icon"> Emergency: +91 98450 12345</p>
                <p><img src="${icons.email}" alt="Email" class="icon"> social.maiya@gmail.com</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

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
                <img src="${icons.hospital}" alt="Hospital Icon" class="logo">
                <h1>Maiya Multi Speciality Hospital</h1>
                <p>New ${formType} Submission</p>
            </div>
            
            <div class="content">
                <div class="details-box">
                    <h3 style="color: #10b981; margin-top: 0;">Submission Information:</h3>
                    <p><strong>Form Type:</strong> ${formType}</p>
                    <p><strong>Submitted On:</strong> ${formattedDate}</p>
                    <p><strong>Reference ID:</strong> ${crypto.randomBytes(8).toString('hex')}</p>
                </div>

                <div class="details-box">
                    <h3 style="color: #10b981; margin-top: 0;">User Details:</h3>
                    ${Object.entries(sanitizedData).map(([key, value]) => 
                      `<p><strong>${key}:</strong> ${value}</p>`
                    ).join('')}
                </div>

                <a href="https://admin.maiyahospital.com" class="button">View in Dashboard</a>
            </div>
            
            <div class="footer">
                <p><strong>Maiya Multi Speciality Hospital - Admin Notification</strong></p>
                <p>This is an automated message. Please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Email service setup
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

// Main email sending functions
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
    
    console.log('Sending email to:', userEmail);
    console.log('Email subject:', subject);
    console.log('Form type:', formType);
    
    const transporter = createSecureTransport();
    await transporter.verify();
    console.log('Transporter verified successfully');
    
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
    
    console.log('Sending mail with options:', {
      to: mailOptions.to,
      subject: mailOptions.subject,
      from: mailOptions.from
    });
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    
    return result;
  } catch (error) {
    console.error('Error sending user confirmation:', error);
    console.error('Error details:', error.message);
    throw error;
  }
};

const sendAdminNotification = async (data, formType) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    console.log('Admin email from env:', adminEmail);
    
    if (!validateEmail(adminEmail)) {
      throw new Error('Invalid admin email address');
    }
    
    const emailHtml = generateSecureAdminNotification(data, formType);
    const subject = `New ${formType} Submission - Maiya Hospital`;
    
    console.log('Sending admin notification to:', adminEmail);
    console.log('Notification subject:', subject);
    console.log('Form type:', formType);
    
    const transporter = createSecureTransport();
    await transporter.verify();
    console.log('Admin notification transporter verified');
    
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
    
    console.log('Sending admin notification with options:', {
      to: mailOptions.to,
      subject: mailOptions.subject,
      from: mailOptions.from
    });
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Admin notification sent successfully:', result.messageId);
    
    return result;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    console.error('Error details:', error.message);
    throw error;
  }
};

module.exports = {
  sendUserConfirmation,
  sendAdminNotification,
  validateEmail,
  sanitizeInput
};