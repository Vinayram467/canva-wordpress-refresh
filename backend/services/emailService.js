const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Keep all the existing ICONS, SECURITY_CONFIG, and emailStyles...

// Validation functions remain the same...
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
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Email validation failed: invalid format');
      return false;
    }

    console.log('Email validation passed:', email);
    return true;
  } catch (error) {
    console.error('Error in validateEmail:', error);
    return false;
  }
};

const createSecureTransport = () => {
  try {
    console.log('Creating email transport...');
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

// Template generation functions
function generateSecureAppointmentConfirmationEmail(data) {
  try {
    console.log('Generating appointment confirmation email template...');
    const sanitizedData = {
      patientName: sanitizeInput(data.patientName || data.name || ''),
      email: sanitizeInput(data.email || data.patientEmail || ''),
      phone: sanitizeInput(data.phone || data.patientPhone || ''),
      date: sanitizeInput(data.date || data.appointmentDate || ''),
      time: sanitizeInput(data.time || data.appointmentTime || ''),
      reason: sanitizeInput(data.reason || '')
    };

    // ... keep existing template HTML ...
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>${emailStyles}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Submission!</h1>
          </div>
          
          <div class="content">
            <div class="details-box">
              <h3>
                <img src="${ICONS.user}" class="icon" alt="User">
                Personal Information
              </h3>
              <div class="detail-row">
                <img src="${ICONS.user}" class="icon" alt="Name">
                <div>
                  <strong>Patient Name:</strong><br>
                  ${sanitizedData.patientName}
                </div>
              </div>
              <div class="detail-row">
                <img src="${ICONS.email}" class="icon" alt="Email">
                <div>
                  <strong>Email:</strong><br>
                  ${sanitizedData.email}
                </div>
              </div>
              <div class="detail-row">
                <img src="${ICONS.phone}" class="icon" alt="Phone">
                <div>
                  <strong>Phone:</strong><br>
                  ${sanitizedData.phone}
                </div>
              </div>
            </div>

            <div class="details-box">
              <h3>
                <img src="${ICONS.calendar}" class="icon" alt="Calendar">
                Appointment Details
              </h3>
              <div class="detail-row">
                <img src="${ICONS.calendar}" class="icon" alt="Date">
                <div>
                  <strong>Date:</strong><br>
                  ${sanitizedData.date}
                </div>
              </div>
              <div class="detail-row">
                <img src="${ICONS.time}" class="icon" alt="Time">
                <div>
                  <strong>Time:</strong><br>
                  ${sanitizedData.time}
                </div>
              </div>
              ${sanitizedData.reason ? `
              <div class="detail-row">
                <img src="${ICONS.user}" class="icon" alt="Reason">
                <div>
                  <strong>Reason:</strong><br>
                  ${sanitizedData.reason}
                </div>
              </div>
              ` : ''}
            </div>

            <div class="details-box">
              <h3>
                <img src="${ICONS.time}" class="icon" alt="Next">
                Next Steps
              </h3>
              <div class="detail-row">
                <img src="${ICONS.calendar}" class="icon" alt="Review">
                Our team will review your submission within 2-3 business days
              </div>
              <div class="detail-row">
                <img src="${ICONS.email}" class="icon" alt="Update">
                You will receive an email update once the review is complete
              </div>
              <div class="detail-row">
                <img src="${ICONS.phone}" class="icon" alt="Contact">
                If we need additional information, we'll contact you directly
              </div>
            </div>

            <div class="details-box">
              <h3>
                <img src="${ICONS.phone}" class="icon" alt="Emergency">
                Emergency Contact
              </h3>
              <div class="detail-row">
                <img src="${ICONS.phone}" class="icon" alt="Phone">
                <div>
                  <strong>24/7 Emergency:</strong><br>
                  +91 98450 12345
                </div>
              </div>
            </div>

            <a href="https://maiyahospital.com" class="button">Visit Our Website</a>

            <div class="footer">
              <p><strong>Maiya Multi Speciality Hospital</strong></p>
              <div class="detail-row">
                <img src="${ICONS.location}" class="icon" alt="Location">
                34, 10th Main Rd, Jayanagar 1st Block
              </div>
              <div class="detail-row">
                <img src="${ICONS.phone}" class="icon" alt="Phone">
                +91 98450 12345
              </div>
              <div class="detail-row">
                <img src="${ICONS.email}" class="icon" alt="Email">
                social.maiya@gmail.com
              </div>
              <p style="margin-top: 20px; font-size: 12px; color: #666;">
                This is an automated confirmation email. Please do not reply directly to this message.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  } catch (error) {
    console.error('Error generating appointment confirmation email:', error);
    throw error;
  }
}

function generateSecureAdminNotification(data, formType) {
  try {
    console.log('Generating admin notification email template...');
    const sanitizedData = {};
    Object.keys(data).forEach(key => {
      sanitizedData[key] = sanitizeInput(data[key]);
    });

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>${emailStyles}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Form Submission Received</h1>
          </div>
          
          <div class="content">
            <div class="details-box">
              <h3>
                <img src="${ICONS.calendar}" class="icon" alt="Info">
                Submission Information
              </h3>
              <div class="detail-row">
                <img src="${ICONS.calendar}" class="icon" alt="Date">
                <div>
                  <strong>Submitted:</strong><br>
                  ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </div>
              </div>
              <div class="detail-row">
                <img src="${ICONS.user}" class="icon" alt="Form">
                <div>
                  <strong>Form Type:</strong><br>
                  ${formType}
                </div>
              </div>
              <div class="detail-row">
                <img src="${ICONS.user}" class="icon" alt="ID">
                <div>
                  <strong>Reference ID:</strong><br>
                  ${crypto.randomBytes(4).toString('hex').toUpperCase()}
                </div>
              </div>
            </div>

            <div class="details-box">
              <h3>
                <img src="${ICONS.user}" class="icon" alt="User">
                User Details
              </h3>
              ${Object.entries(sanitizedData).map(([key, value]) => `
                <div class="detail-row">
                  <img src="${ICONS[key.toLowerCase().includes('email') ? 'email' : 
                            key.toLowerCase().includes('phone') ? 'phone' : 
                            key.toLowerCase().includes('name') ? 'user' : 'user']}" 
                       class="icon" alt="${key}">
                  <div>
                    <strong>${key}:</strong><br>
                    ${value}
                  </div>
                </div>
              `).join('')}
            </div>

            <a href="https://admin.maiyahospital.com/dashboard" class="button">View in Dashboard</a>

            <div class="footer">
              <p><strong>Maiya Multi Speciality Hospital - Admin Portal</strong></p>
              <p style="margin-top: 20px; font-size: 12px; color: #666;">
                This is an automated notification. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  } catch (error) {
    console.error('Error generating admin notification email:', error);
    throw error;
  }
}

// Main email sending functions remain the same...
async function sendUserConfirmation(data, formType) {
  // ... keep existing function ...
}

async function sendAdminNotification(data, formType) {
  // ... keep existing function ...
}

// Export all functions
module.exports = {
  sendUserConfirmation,
  sendAdminNotification,
  validateEmail,
  sanitizeInput,
  generateSecureAppointmentConfirmationEmail,
  generateSecureAdminNotification
};