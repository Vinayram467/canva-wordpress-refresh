const nodemailer = require('nodemailer');
const crypto = require('crypto');

// First, define all constants and configurations
const ICONS = {
  // ... keep existing icons ...
};

const SECURITY_CONFIG = {
  // ... keep existing config ...
};

const emailStyles = `
  // ... keep existing styles ...
`;

// Then define all utility functions
const sanitizeInput = (input) => {
  // ... keep existing function ...
};

const validateEmail = (email) => {
  // ... keep existing function ...
};

const createSecureTransport = () => {
  // ... keep existing function ...
};

// Then define template generation functions
const generateSecureAppointmentConfirmationEmail = (data) => {
  // ... keep existing function ...
};

const generateSecureAdminNotification = (data, formType) => {
  // ... keep existing function ...
};

// Finally, define and export the main email sending functions
/**
 * Sends confirmation email to user
 * @param {Object} data - The form data
 * @param {string} formType - The type of form submitted
 * @returns {Promise} - The email sending result
 */
async function sendUserConfirmation(data, formType) {
  try {
    console.log('Starting sendUserConfirmation with:', { formType });
    const userEmail = data.email || data.patientEmail;
    
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
}

/**
 * Sends notification email to admin
 * @param {Object} data - The form data
 * @param {string} formType - The type of form submitted
 * @returns {Promise} - The email sending result
 */
async function sendAdminNotification(data, formType) {
  try {
    console.log('Starting sendAdminNotification with:', { formType });
    const adminEmail = process.env.ADMIN_EMAIL;
    
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
}

// Export the functions
module.exports = {
  sendUserConfirmation: sendUserConfirmation,
  sendAdminNotification: sendAdminNotification,
  validateEmail: validateEmail,
  sanitizeInput: sanitizeInput
};