const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { AppError, ErrorTypes } = require('../middleware/errorHandler');

// Keep existing ICONS and styles...

const createSecureTransport = () => {
  try {
    // Log email configuration
    console.log('Creating email transport with config:', {
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      user: process.env.EMAIL_USER,
      secure: false,
      // Not logging password for security
    });

    // Verify environment variables
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
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: true,
        ciphers: 'SSLv3'
      },
      debug: true, // Enable debug logging
      logger: true  // Enable built-in logger
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

const sendUserConfirmation = async (data, formType) => {
  try {
    console.log('Starting sendUserConfirmation with:', {
      formType,
      recipientEmail: data.email || data.patientEmail,
      senderEmail: process.env.EMAIL_USER
    });

    const userEmail = data.email || data.patientEmail;
    
    if (!userEmail) {
      throw new AppError(
        ErrorTypes.VALIDATION_ERROR,
        'No email address provided',
        400
      );
    }
    
    if (!validateEmail(userEmail)) {
      throw new AppError(
        ErrorTypes.VALIDATION_ERROR,
        `Invalid email format: ${userEmail}`,
        400
      );
    }

    console.log('Generating email template...');
    const emailHtml = generateSecureAppointmentConfirmationEmail(data);
    const subject = `${formType.charAt(0).toUpperCase() + formType.slice(1)} Confirmation - Maiya Hospital`;
    
    console.log('Creating transport...');
    const transporter = createSecureTransport();
    
    console.log('Verifying transport...');
    await transporter.verify();
    console.log('Transport verified successfully');
    
    console.log('Preparing to send email to:', userEmail);
    const mailOptions = {
      from: {
        name: 'Maiya Multi Speciality Hospital',
        address: process.env.EMAIL_USER
      },
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
    
    console.log('Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', {
      messageId: result.messageId,
      response: result.response,
      accepted: result.accepted,
      rejected: result.rejected
    });
    
    return result;
  } catch (error) {
    console.error('Error in sendUserConfirmation:', error);
    throw new AppError(
      ErrorTypes.EMAIL_ERROR,
      'Failed to send confirmation email',
      500,
      error
    );
  }
};

const sendAdminNotification = async (data, formType) => {
  try {
    console.log('Starting sendAdminNotification with:', {
      formType,
      adminEmail: process.env.ADMIN_EMAIL,
      senderEmail: process.env.EMAIL_USER
    });

    const adminEmail = process.env.ADMIN_EMAIL;
    
    if (!adminEmail) {
      throw new AppError(
        ErrorTypes.EMAIL_ERROR,
        'ADMIN_EMAIL environment variable is not set',
        500
      );
    }
    
    if (!validateEmail(adminEmail)) {
      throw new AppError(
        ErrorTypes.VALIDATION_ERROR,
        `Invalid admin email format: ${adminEmail}`,
        400
      );
    }

    console.log('Generating admin notification template...');
    const emailHtml = generateSecureAdminNotification(data, formType);
    const subject = `New ${formType} Submission - Maiya Hospital`;
    
    console.log('Creating transport...');
    const transporter = createSecureTransport();
    
    console.log('Verifying transport...');
    await transporter.verify();
    console.log('Transport verified successfully');
    
    console.log('Preparing to send admin notification to:', adminEmail);
    const mailOptions = {
      from: {
        name: 'Maiya Hospital System',
        address: process.env.EMAIL_USER
      },
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
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const result = await transporter.sendMail(mailOptions);
    console.log('Admin notification sent successfully:', {
      messageId: result.messageId,
      response: result.response,
      accepted: result.accepted,
      rejected: result.rejected
    });
    
    return result;
  } catch (error) {
    console.error('Error in sendAdminNotification:', error);
    throw new AppError(
      ErrorTypes.EMAIL_ERROR,
      'Failed to send admin notification',
      500,
      error
    );
  }
};

// Keep existing template generation functions...

module.exports = {
  sendUserConfirmation,
  sendAdminNotification,
  validateEmail,
  sanitizeInput
};