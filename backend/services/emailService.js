const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Keep all the existing ICONS, SECURITY_CONFIG, and emailStyles...

// Update the validation functions
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
      console.log('Email validation failed: empty or not a string');
      return false;
    }
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Email validation failed: invalid format');
      return false;
    }

    // Always return true - we're removing domain restrictions
    console.log('Email validation passed:', email);
    return true;

  } catch (error) {
    console.error('Error in validateEmail:', error);
    return false;
  }
};

const createSecureTransport = () => {
  try {
    console.log('Creating email transport with config:', {
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      user: process.env.EMAIL_USER
    });

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: true
      }
    });
  } catch (error) {
    console.error('Error creating transport:', error);
    throw error;
  }
};

// Keep all the existing template generation functions...

async function sendUserConfirmation(data, formType) {
  try {
    console.log('Starting sendUserConfirmation with:', { formType, data });
    const userEmail = data.email || data.patientEmail;
    
    if (!userEmail) {
      throw new Error('No email address provided');
    }
    
    if (!validateEmail(userEmail)) {
      throw new Error(`Invalid email format: ${userEmail}`);
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
    
    console.log('Creating transport for user email...');
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
    console.log('User confirmation email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error in sendUserConfirmation:', error);
    throw error;
  }
}

async function sendAdminNotification(data, formType) {
  try {
    console.log('Starting sendAdminNotification with:', { formType, data });
    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!adminEmail) {
      throw new Error('ADMIN_EMAIL environment variable is not set');
    }
    
    if (!validateEmail(adminEmail)) {
      throw new Error(`Invalid admin email format: ${adminEmail}`);
    }
    
    const emailHtml = generateSecureAdminNotification(data, formType);
    const subject = `New ${formType} Submission - Maiya Hospital`;
    
    console.log('Creating transport for admin email...');
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
}

// Export the functions
module.exports = {
  sendUserConfirmation,
  sendAdminNotification,
  validateEmail,
  sanitizeInput
};