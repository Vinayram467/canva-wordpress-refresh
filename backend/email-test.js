// Simple email test script
const nodemailer = require('nodemailer');
require('dotenv').config();

// Test email configuration
const testEmailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

// Create transporter
const transporter = nodemailer.createTransporter(testEmailConfig);

// Test email function
async function testEmail() {
  try {
    console.log('🔧 Testing email configuration...');
    console.log('📧 Email User:', process.env.EMAIL_USER);
    console.log('🔑 Email Pass:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
    
    // Verify connection
    await transporter.verify();
    console.log('✅ Email connection verified successfully');
    
    // Send test email
    const testEmail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: 'Test Email from Maiya Hospital Backend',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email from your Maiya Hospital backend.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
        <p>If you receive this, your email configuration is working!</p>
      `
    };
    
    const info = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully');
    console.log('📧 Message ID:', info.messageId);
    console.log('📤 Response:', info.response);
    
  } catch (error) {
    console.error('❌ Email test failed:', error);
    console.error('🔧 Please check your email configuration');
  }
}

// Run test
testEmail(); 