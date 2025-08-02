const nodemailer = require('nodemailer');
const crypto = require('crypto');
const emailStyles = require('./emailStyles');
const icons = require('./emailIcons');

// ... keep all the existing configurations and validation functions ...

const generateSecureAppointmentConfirmationEmail = (data) => {
  const sanitizedData = {
    patientName: sanitizeInput(data.patientName || data.name || ''),
    email: sanitizeInput(data.email || data.patientEmail || ''),
    phone: sanitizeInput(data.phone || data.patientPhone || ''),
    date: sanitizeInput(data.date || data.appointmentDate || ''),
    time: sanitizeInput(data.time || data.appointmentTime || ''),
    reason: sanitizeInput(data.reason || '')
  };

  const formattedDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short'
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
                Thank You for Your Submission!
            </div>
            
            <div class="content">
                <div class="greeting">
                    Dear ${sanitizedData.patientName},
                </div>
                
                <div class="message">
                    Thank you for submitting your form. We have successfully received your information and wanted to confirm that your submission has been processed.
                </div>
                
                <div class="details-box">
                    <h3>Submission Details:</h3>
                    <div class="detail-item">
                        <img src="${icons.calendar}" alt="Date" style="vertical-align: middle; margin-right: 8px;">
                        Submitted on: ${formattedDate}
                    </div>
                    <div class="detail-item">
                        <img src="${icons.user}" alt="ID" style="vertical-align: middle; margin-right: 8px;">
                        Reference ID: ${crypto.randomBytes(4).toString('hex').toUpperCase()}
                    </div>
                    <div class="detail-item">
                        <img src="${icons.calendar}" alt="Form" style="vertical-align: middle; margin-right: 8px;">
                        Form Type: Appointment Request
                    </div>
                </div>

                <div class="next-steps">
                    <h3>What happens next?</h3>
                    <ul>
                        <li>
                            <img src="${icons.time}" alt="Time" style="vertical-align: middle; margin-right: 8px;">
                            Our team will review your submission within 2-3 business days
                        </li>
                        <li>
                            <img src="${icons.email}" alt="Email" style="vertical-align: middle; margin-right: 8px;">
                            You will receive an email update once the review is complete
                        </li>
                        <li>
                            <img src="${icons.phone}" alt="Phone" style="vertical-align: middle; margin-right: 8px;">
                            If we need any additional information, we'll contact you directly
                        </li>
                    </ul>
                </div>

                <div class="contact-section">
                    <p>If you have any questions or need to make changes to your submission, please don't hesitate to contact us:</p>
                    
                    <div class="contact-item">
                        <img src="${icons.email}" alt="Email" style="vertical-align: middle; margin-right: 8px;">
                        Email: social.maiya@gmail.com
                    </div>
                    
                    <div class="contact-item">
                        <img src="${icons.phone}" alt="Phone" style="vertical-align: middle; margin-right: 8px;">
                        Phone: +91 98450 12345
                    </div>
                    
                    <div class="contact-item">
                        <img src="${icons.website}" alt="Website" style="vertical-align: middle; margin-right: 8px;">
                        Website: www.maiyahospital.com
                    </div>
                </div>

                <a href="https://maiyahospital.com" class="button">Visit Our Website</a>

                <div class="signature">
                    <div class="company">Maiya Multi Speciality Hospital</div>
                    <div class="title">Healthcare Excellence</div>
                </div>
            </div>
            
            <div class="footer">
                This is an automated confirmation email. Please do not reply directly to this message.
            </div>
        </div>
    </body>
    </html>
  `;
};

// Admin notification template with icons
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
                New Form Submission Received
            </div>
            
            <div class="content">
                <div class="message">
                    Hello,<br><br>
                    You have received a new form submission on your website. Please find the details below:
                </div>
                
                <div class="details-box">
                    <h3>Submission Information:</h3>
                    <div class="detail-item">
                        <img src="${icons.calendar}" alt="Date" style="vertical-align: middle; margin-right: 8px;">
                        Submitted: ${formattedDate}
                    </div>
                    <div class="detail-item">
                        <img src="${icons.user}" alt="Form" style="vertical-align: middle; margin-right: 8px;">
                        Form: ${formType}
                    </div>
                    <div class="detail-item">
                        <img src="${icons.user}" alt="ID" style="vertical-align: middle; margin-right: 8px;">
                        Reference ID: ${crypto.randomBytes(4).toString('hex').toUpperCase()}
                    </div>
                </div>

                <div class="details-box">
                    <h3>Contact Details:</h3>
                    ${Object.entries(sanitizedData).map(([key, value]) => `
                        <div class="detail-item">
                            <img src="${icons[key.toLowerCase().includes('email') ? 'email' : 
                                      key.toLowerCase().includes('phone') ? 'phone' : 
                                      key.toLowerCase().includes('name') ? 'user' : 'user']}" 
                                 alt="${key}" style="vertical-align: middle; margin-right: 8px;">
                            ${key}: ${value}
                        </div>
                    `).join('')}
                </div>

                <a href="https://admin.maiyahospital.com/dashboard" class="button">View in Dashboard</a>

                <div class="signature">
                    <div class="company">Maiya Multi Speciality Hospital</div>
                    <div class="title">Admin Notification System</div>
                </div>
            </div>
            
            <div class="footer">
                This is an automated notification. Please do not reply to this email.
            </div>
        </div>
    </body>
    </html>
  `;
};

// Keep the rest of the file (email service functions) the same...

module.exports = {
  sendUserConfirmation,
  sendAdminNotification,
  validateEmail,
  sanitizeInput
};