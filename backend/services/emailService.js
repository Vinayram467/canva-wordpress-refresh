const nodemailer = require('nodemailer');
const { validateEmail } = require('../security/securityMiddleware');

// Email icons (Base64 encoded SVG)
// Using Font Awesome icons for better email client compatibility
const ICONS = {
  checkmark: '✅',
  calendar: '📅',
  phone: '📞',
  user: '👤',
  hospital: '🏥',
  email: '📧',
  clock: '⏰',
  location: '📍',
  star: '⭐',
  heart: '❤️',
  award: '🏆',
  stethoscope: '👨‍⚕️'
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
      <title>Appointment Confirmation - Maiya Hospital</title>
      <style>
        body { 
          font-family: 'Segoe UI', Arial, sans-serif; 
          line-height: 1.6; 
          color: #1a1a1a;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        .container { 
          max-width: 600px; 
          margin: 40px auto; 
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(135deg, #16a731 0%, #0d8024 100%);
          color: white;
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .header p {
          margin: 10px 0 0;
          opacity: 0.9;
          font-size: 16px;
        }
        .content {
          padding: 40px 30px;
          background: #ffffff;
        }
        .success-banner {
          background: linear-gradient(135deg, #16a731 0%, #0d8024 100%);
          color: white;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          margin-bottom: 30px;
        }
        .success-banner h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .success-banner p {
          margin: 10px 0 0;
          opacity: 0.9;
        }
        .appointment-details {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 25px;
          margin-top: 30px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .detail-row {
          display: flex;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          font-weight: 600;
          color: #16a731;
          width: 140px;
          flex-shrink: 0;
        }
        .detail-value {
          color: #1a1a1a;
          flex-grow: 1;
        }
        .section {
          margin: 40px 0;
          padding: 30px;
          background: #f8f9fa;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 20px;
        }
        .feature {
          text-align: center;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .feature-icon {
          font-size: 32px;
          margin-bottom: 15px;
        }
        .feature h4 {
          margin: 10px 0;
          color: #16a731;
          font-size: 18px;
        }
        .feature p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 30px;
        }
        .stat {
          text-align: center;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .stat-number {
          font-size: 28px;
          font-weight: 700;
          color: #16a731;
          margin-bottom: 5px;
        }
        .stat-label {
          color: #666;
          font-size: 14px;
        }
        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin: 30px 0;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .button.primary {
          background: #16a731;
          color: white;
        }
        .button.secondary {
          background: #f8f9fa;
          color: #16a731;
          border: 2px solid #16a731;
        }
        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .next-steps {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 12px;
          margin: 30px 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .steps-list {
          margin: 20px 0;
          padding-left: 20px;
        }
        .steps-list li {
          margin: 10px 0;
          color: #444;
          line-height: 1.6;
        }
        .footer {
          background: #1a1a1a;
          color: white;
          padding: 40px 30px;
          text-align: center;
          border-radius: 0 0 20px 20px;
        }
        .footer h3 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .footer p {
          margin: 10px 0 0;
          opacity: 0.9;
          font-size: 16px;
        }
        .contact-info {
          margin: 30px 0;
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .contact-info p {
          margin: 10px 0;
          font-size: 14px;
        }
        .social-links {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }
        .social-button {
          display: inline-block;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          text-decoration: none;
          border-radius: 20px;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        .social-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏥 Maiya Hospital</h1>
          <p>Excellence in Healthcare Since 1978</p>
        </div>
        
        <div class="content">
          <div class="success-banner">
            <h2>✅ Appointment Confirmed!</h2>
            <p>Thank you for choosing Maiya Hospital. Your ${typeText.toLowerCase()} has been received.</p>
          </div>

          <div class="appointment-details">
            <h3 style="margin: 0 0 20px; color: #16a731;">Your Appointment Details</h3>
            
            <div class="detail-row">
              <span class="detail-label">${ICONS.user} Patient Name</span>
              <span class="detail-value">${sanitizedData.patientName}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">${ICONS.calendar} Date</span>
              <span class="detail-value">${sanitizedData.date || 'Not specified'}</span>
            </div>

            ${sanitizedData.time ? `
            <div class="detail-row">
              <span class="detail-label">${ICONS.clock} Time</span>
              <span class="detail-value">${sanitizedData.time}</span>
            </div>
            ` : ''}

            <div class="detail-row">
              <span class="detail-label">${ICONS.phone} Phone</span>
              <span class="detail-value">${sanitizedData.phone}</span>
            </div>

            ${sanitizedData.reason ? `
            <div class="detail-row">
              <span class="detail-label">${ICONS.stethoscope} Purpose</span>
              <span class="detail-value">${sanitizedData.reason}</span>
            </div>
            ` : ''}
          </div>

          <div class="section why-choose-us">
            <h3 style="color: #16a731; margin: 30px 0 20px;">Why Choose Maiya Hospital ${ICONS.star}</h3>
            <div class="features-grid">
              <div class="feature">
                <div class="feature-icon">${ICONS.stethoscope}</div>
                <h4>Expert Doctors</h4>
                <p>Highly qualified specialists with years of experience</p>
              </div>
              <div class="feature">
                <div class="feature-icon">${ICONS.heart}</div>
                <h4>Patient Care</h4>
                <p>Personalized attention and comprehensive care</p>
              </div>
              <div class="feature">
                <div class="feature-icon">${ICONS.award}</div>
                <h4>Advanced Technology</h4>
                <p>State-of-the-art medical equipment and facilities</p>
              </div>
            </div>
          </div>

          <div class="section about-us">
            <h3 style="color: #16a731; margin: 30px 0 20px;">About Maiya Hospital ${ICONS.hospital}</h3>
            <p style="line-height: 1.6; color: #444;">
              With over 45 years of excellence in healthcare, Maiya Hospital has been at the forefront of medical innovation 
              and patient care in Bangalore. Our commitment to providing world-class healthcare services has made us one of 
              the most trusted healthcare institutions in the region.
            </p>
            <div class="stats-grid">
              <div class="stat">
                <div class="stat-number">45+</div>
                <div class="stat-label">Years of Service</div>
              </div>
              <div class="stat">
                <div class="stat-number">50+</div>
                <div class="stat-label">Expert Doctors</div>
              </div>
              <div class="stat">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Emergency Care</div>
              </div>
            </div>
          </div>

          <div class="action-buttons">
            <a href="https://maiyahospital.com" class="button primary">
              Visit Our Website
            </a>
            <a href="https://maiyahospital.com/contact" class="button secondary">
              Contact Us
            </a>
          </div>

          <div class="next-steps">
            <h3 style="color: #16a731; margin: 30px 0 20px;">Next Steps ${ICONS.checkmark}</h3>
            <ol class="steps-list">
              <li>Our team will review your appointment request</li>
              <li>You'll receive a confirmation call within 24 hours</li>
              <li>Arrive 15 minutes before your appointment time</li>
              <li>Bring any relevant medical records</li>
            </ol>
          </div>
        </div>
        
        <div class="footer">
          <h3>Maiya Hospital</h3>
          <p>Excellence in Healthcare Since 1978</p>
          
          <div class="contact-info">
            <p>${ICONS.phone} Emergency: +91 98450 12345</p>
            <p>${ICONS.hospital} 24/7 Emergency Care Available</p>
            <p>${ICONS.location} 34, 10th Main Rd, Jayanagar 1st Block, Bengaluru</p>
            <p>${ICONS.email} info@maiyahospital.com</p>
          </div>

          <div class="social-links">
            <a href="https://facebook.com/maiyahospital" class="social-button">Facebook</a>
            <a href="https://twitter.com/maiyahospital" class="social-button">Twitter</a>
            <a href="https://instagram.com/maiyahospital" class="social-button">Instagram</a>
          </div>
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

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Patient Request - Maiya Hospital Admin</title>
      <style>
        body { 
          font-family: 'Segoe UI', Arial, sans-serif; 
          line-height: 1.6; 
          color: #1a1a1a;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        .container { 
          max-width: 600px; 
          margin: 40px auto; 
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header { 
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          color: white;
          padding: 40px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 600;
        }
        .header p {
          margin: 10px 0 0;
          opacity: 0.9;
          font-size: 16px;
        }
        .content {
          padding: 40px 30px;
          background: #ffffff;
        }
        .notification-banner {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          color: white;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          margin-bottom: 30px;
        }
        .notification-banner h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .notification-banner p {
          margin: 10px 0 0;
          opacity: 0.9;
        }
        .timestamp {
          background: rgba(255, 255, 255, 0.1);
          padding: 8px 16px;
          border-radius: 20px;
          margin-top: 15px;
          display: inline-block;
          font-size: 14px;
        }
        .patient-details {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 25px;
          margin-top: 30px;
        }
        .detail-row {
          display: flex;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #e9ecef;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          font-weight: 600;
          color: #2563eb;
          width: 140px;
          flex-shrink: 0;
        }
        .detail-value {
          color: #1a1a1a;
          flex-grow: 1;
        }
        .priority-tag {
          display: inline-block;
          padding: 4px 12px;
          background: #fef3c7;
          color: #92400e;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          margin-top: 20px;
        }
        .action-buttons {
          margin-top: 30px;
          text-align: center;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 0 10px;
        }
        .button-primary {
          background: #2563eb;
          color: white;
        }
        .button-secondary {
          background: #e5e7eb;
          color: #1f2937;
        }
        .footer {
          background: #1a1a1a;
          color: white;
          padding: 30px;
          text-align: center;
        }
        .footer h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }
        .footer p {
          margin: 10px 0 0;
          opacity: 0.8;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏥 Maiya Hospital Admin</h1>
          <p>New Patient Request Notification</p>
        </div>
        
        <div class="content">
          <div class="notification-banner">
            <h2>🔔 New ${typeText}</h2>
            <p>A new request has been submitted and requires your attention.</p>
            <div class="timestamp">
              Received on ${currentDate} at ${currentTime}
            </div>
          </div>

          <div class="patient-details">
            <h3 style="margin: 0 0 20px; color: #2563eb;">Patient Information</h3>
            
            <div class="detail-row">
              <span class="detail-label">Patient Name</span>
              <span class="detail-value">${sanitizedData.patientName}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">Email Address</span>
              <span class="detail-value">${sanitizedData.email}</span>
            </div>

            <div class="detail-row">
              <span class="detail-label">Phone Number</span>
              <span class="detail-value">${sanitizedData.phone}</span>
            </div>

            ${sanitizedData.date ? `
            <div class="detail-row">
              <span class="detail-label">Requested Date</span>
              <span class="detail-value">${sanitizedData.date}</span>
            </div>
            ` : ''}

            ${sanitizedData.time ? `
            <div class="detail-row">
              <span class="detail-label">Requested Time</span>
              <span class="detail-value">${sanitizedData.time}</span>
            </div>
            ` : ''}

            ${sanitizedData.reason ? `
            <div class="detail-row">
              <span class="detail-label">Visit Purpose</span>
              <span class="detail-value">${sanitizedData.reason}</span>
            </div>
            ` : ''}

            <div class="priority-tag">
              ⚡ Requires Response within 24 Hours
            </div>
          </div>

          <div class="action-buttons">
            <a href="https://maiyahospital.com/admin/appointments" class="button button-primary">
              View in Dashboard
            </a>
            <a href="tel:${sanitizedData.phone}" class="button button-secondary">
              Call Patient
            </a>
          </div>
        </div>
        
        <div class="footer">
          <h3>Maiya Hospital Administration</h3>
          <p>This is an automated notification. Please handle the request according to standard procedures.</p>
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