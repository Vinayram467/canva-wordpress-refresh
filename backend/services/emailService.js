const nodemailer = require('nodemailer');
const { validateEmail } = require('../security/securityMiddleware');

// Email icons (Base64 encoded SVG)
const ICONS = {
  checkmark: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDZMMTAgMTZMNCAxMCIgc3Ryb2tlPSIjMTZhNzMxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K',
  calendar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMkE2IDYgMCAwIDAgMiA4VjE5QTYgNiAwIDAgMCA4IDI1SDE2QTYgNiAwIDAgMCAyMiAxOVY4QTYgNiAwIDAgMCAxNiAySDhNMjAgMTlBMyAzIDAgMCAxIDE3IDIySDdBMyAzIDAgMCAxIDQgMTlWMTFBMiAyIDAgMCAxIDYgOUgxOEEyIDIgMCAwIDEgMjAgMTFWMjBaIiBmaWxsPSIjMTZhNzMxIi8+Cjwvc3ZnPgo=',
  phone: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIyIDE2LjkydjNhMiAyIDAgMCAxLTIuMTggMS45OUgxNC4wNGEyIDIgMCAwIDEtMS45OS0yLjE4bC4zMS0yLjYxYzEuMDctLjQzIDIuMTQtLjk0IDMuMTQtMS40M2wuNzguNzNhMiAyIDAgMCAxIDAgMi44M2wtMi40NyAyLjQ3YTIgMiAwIDAgMS0yLjgzIDBsLS43OC0uNzNhMTIuNDMgMTIuNDMgMCAwIDEtMS40My0zLjE0bC0yLjYxLjMxYTIgMiAwIDAgMS0yLjE4LTEuOTlWMTYuOTJhMiAyIDAgMCAxIDEuOTktMi4xOGwyLjYxLS4zMWMuNDMtMS4wNy45NC0yLjA3IDEuNDMtMy4xNGwtLjc4LS43M2EyIDIgMCAwIDEgMC0yLjgzbDIuNDctMi40N2EyIDIgMCAwIDEgMi44MyAwbC43OC43M2ExMi40MyAxMi40MyAwIDAgMSAzLjE0IDEuNDNsMi42MS0uMzFBMiAyIDAgMCAxIDIyIDE2LjkyeiIgZmlsbD0iIzE2YTczMSIvPgo8L3N2Zz4K',
  user: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDIxVjE5QzIwIDE3LjM0IDE4LjY2IDE2IDE3IDE2SDEzQzExLjM0IDE2IDEwIDE3LjM0IDEwIDE5VjIxIiBzdHJva2U9IiMxNmE3MzEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIgc3Ryb2tlPSIjMTZhNzMxIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==',
  hospital: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDE0VjExQzE5IDkuMzQgMTcuNjYgOCAxNiA4SDEyQzEwLjM0IDggOSA5LjM0IDkgMTFWMTQiIHN0cm9rZT0iIzE2YTczMSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTE0IDJWNkgyMFYyIiBzdHJva2U9IiMxNmE3MzEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMCAyMlYxNCIgc3Ryb2tlPSIjMTZhNzMxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K'
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

const createSecureTransport = () => {
  try {
    console.log('Creating email transport...');
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Missing email credentials');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      debug: true,
      logger: true
    });

    return transporter;
  } catch (error) {
    console.error('Error creating email transport:', error);
    throw error;
  }
};

const generateUserConfirmationEmail = (data, type) => {
  const sanitizedData = {
    patientName: sanitizeInput(data.patientName || data.name || ''),
    email: sanitizeInput(data.email || ''),
    phone: sanitizeInput(data.phone || ''),
    date: sanitizeInput(data.date || ''),
    time: sanitizeInput(data.time || ''),
    reason: sanitizeInput(data.reason || data.message || '')
  };

  const typeText = type === 'appointment' ? 'Appointment Request' : 
                   type === 'contact' ? 'Contact Form Submission' :
                   type === 'consultation' ? 'Virtual Consultation Request' :
                   type === 'assessment' ? 'Health Assessment Submission' : 'Form Submission';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmation - Maiya Hospital</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #16a731; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center; }
        .info-row { display: flex; align-items: center; margin: 15px 0; padding: 10px; background: white; border-radius: 5px; }
        .icon { width: 20px; height: 20px; margin-right: 10px; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏥 Maiya Hospital</h1>
          <p>Excellence in Healthcare Since 1978</p>
        </div>
        
        <div class="content">
          <div class="success">
            <h2>✅ Request Received Successfully!</h2>
            <p>Thank you for contacting Maiya Hospital. We have received your ${typeText.toLowerCase()} and will get back to you within 24 hours.</p>
          </div>
          
          <div class="info-row">
            <img src="${ICONS.user}" alt="👤" class="icon">
            <strong>Name:</strong> ${sanitizedData.patientName}
          </div>
          
          <div class="info-row">
            <img src="${ICONS.calendar}" alt="📅" class="icon">
            <strong>Date:</strong> ${sanitizedData.date || 'Not specified'}
          </div>
          
          ${sanitizedData.time ? `
          <div class="info-row">
            <img src="${ICONS.calendar}" alt="🕐" class="icon">
            <strong>Time:</strong> ${sanitizedData.time}
          </div>
          ` : ''}
          
          <div class="info-row">
            <img src="${ICONS.phone}" alt="📞" class="icon">
            <strong>Phone:</strong> ${sanitizedData.phone}
          </div>
          
          ${sanitizedData.reason ? `
          <div class="info-row">
            <img src="${ICONS.hospital}" alt="🏥" class="icon">
            <strong>Details:</strong> ${sanitizedData.reason}
          </div>
          ` : ''}
        </div>
        
        <div class="footer">
          <h3>🏥 Maiya Hospital</h3>
          <p>Providing world-class healthcare services for over 46 years</p>
          <p>📞 +91 98450 12345 | 🕐 24/7 Emergency Care</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const generateAdminNotificationEmail = (data, type) => {
  const sanitizedData = {
    patientName: sanitizeInput(data.patientName || data.name || ''),
    email: sanitizeInput(data.email || ''),
    phone: sanitizeInput(data.phone || ''),
    date: sanitizeInput(data.date || ''),
    time: sanitizeInput(data.time || ''),
    reason: sanitizeInput(data.reason || data.message || '')
  };

  const typeText = type === 'appointment' ? 'Appointment Request' : 
                   type === 'contact' ? 'Contact Form Submission' :
                   type === 'consultation' ? 'Virtual Consultation Request' :
                   type === 'assessment' ? 'Health Assessment Submission' : 'Form Submission';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New ${typeText} - Maiya Hospital</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #dc2626; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; }
        .alert { background: #fef2f2; border: 1px solid #fecaca; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center; }
        .info-row { display: flex; align-items: center; margin: 15px 0; padding: 10px; background: white; border-radius: 5px; }
        .icon { width: 20px; height: 20px; margin-right: 10px; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏥 Maiya Hospital</h1>
          <p>New ${typeText} Received</p>
        </div>
        
        <div class="content">
          <div class="alert">
            <h2>🔔 New ${typeText}</h2>
            <p>A new ${typeText.toLowerCase()} has been submitted through the website.</p>
          </div>
          
          <div class="info-row">
            <img src="${ICONS.user}" alt="👤" class="icon">
            <strong>Patient Name:</strong> ${sanitizedData.patientName}
          </div>
          
          <div class="info-row">
            <img src="${ICONS.phone}" alt="📞" class="icon">
            <strong>Email:</strong> ${sanitizedData.email}
          </div>
          
          <div class="info-row">
            <img src="${ICONS.phone}" alt="📞" class="icon">
            <strong>Phone:</strong> ${sanitizedData.phone}
          </div>
          
          ${sanitizedData.date ? `
          <div class="info-row">
            <img src="${ICONS.calendar}" alt="📅" class="icon">
            <strong>Preferred Date:</strong> ${sanitizedData.date}
          </div>
          ` : ''}
          
          ${sanitizedData.time ? `
          <div class="info-row">
            <img src="${ICONS.calendar}" alt="🕐" class="icon">
            <strong>Preferred Time:</strong> ${sanitizedData.time}
          </div>
          ` : ''}
          
          ${sanitizedData.reason ? `
          <div class="info-row">
            <img src="${ICONS.hospital}" alt="🏥" class="icon">
            <strong>Details:</strong> ${sanitizedData.reason}
          </div>
          ` : ''}
        </div>
        
        <div class="footer">
          <h3>🏥 Maiya Hospital Admin</h3>
          <p>Please respond to this request within 24 hours</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const sendUserConfirmation = async (data, type) => {
  try {
    console.log('Attempting to send user confirmation email...');
    
    if (!validateEmail(data.email)) {
      console.error('Invalid email address:', data.email);
      throw new Error('Invalid email address');
    }

    const transporter = createSecureTransport();
    
    console.log('Verifying transporter...');
    await transporter.verify();
    console.log('Transporter verified successfully');

    const mailOptions = {
      from: `"Maiya Hospital" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `Confirmation - ${type === 'appointment' ? 'Appointment Request' : 
                type === 'contact' ? 'Contact Form' :
                type === 'consultation' ? 'Virtual Consultation' :
                type === 'assessment' ? 'Health Assessment' : 'Form Submission'} Received`,
      html: generateUserConfirmationEmail(data, type)
    };

    console.log('Sending user confirmation email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('User confirmation email sent successfully:', result.messageId);
    
    return result;
  } catch (error) {
    console.error('Error sending user confirmation email:', error);
    throw error;
  }
};

const sendAdminNotification = async (data, type) => {
  try {
    console.log('Attempting to send admin notification email...');
    
    if (!process.env.ADMIN_EMAIL) {
      console.error('ADMIN_EMAIL not configured');
      throw new Error('Admin email not configured');
    }

    const transporter = createSecureTransport();
    
    console.log('Verifying transporter for admin email...');
    await transporter.verify();
    console.log('Transporter verified successfully for admin email');

    const mailOptions = {
      from: `"Maiya Hospital Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New ${type === 'appointment' ? 'Appointment Request' : 
                type === 'contact' ? 'Contact Form Submission' :
                type === 'consultation' ? 'Virtual Consultation Request' :
                type === 'assessment' ? 'Health Assessment Submission' : 'Form Submission'} - Maiya Hospital`,
      html: generateAdminNotificationEmail(data, type)
    };

    console.log('Sending admin notification email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent successfully:', result.messageId);
    
    return result;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    throw error;
  }
};

module.exports = {
  sendUserConfirmation,
  sendAdminNotification,
  sanitizeInput
}; 