const dotenv = require('dotenv');
const emailService = require('./services/emailService');

// Load environment variables
dotenv.config();

const testEmailService = async () => {
  console.log('🧪 Testing Email Service...');
  console.log('📧 Email Configuration:');
  console.log('   Host:', process.env.EMAIL_HOST);
  console.log('   Port:', process.env.EMAIL_PORT);
  console.log('   User:', process.env.EMAIL_USER);
  console.log('   Admin Email:', process.env.ADMIN_EMAIL);
  console.log('   Environment:', process.env.NODE_ENV);

  // Test data
  const testData = {
    patientName: 'John Doe',
    email: 'test@example.com',
    phone: '+91 98765 43210',
    date: '2024-01-15',
    time: '10:00 AM',
    reason: 'General consultation'
  };

  try {
    console.log('\n📤 Testing User Confirmation Email...');
    await emailService.sendUserConfirmation(testData, 'appointment');
    console.log('✅ User confirmation email sent successfully!');

    console.log('\n📤 Testing Admin Notification Email...');
    await emailService.sendAdminNotification(testData, 'appointment');
    console.log('✅ Admin notification email sent successfully!');

    console.log('\n🎉 All email tests passed!');
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.error('Stack trace:', error.stack);
    
    if (error.message.includes('EAUTH')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('   1. Check your EMAIL_USER and EMAIL_PASS in environment.txt');
      console.log('   2. For Gmail, use App Passwords, not your regular password');
      console.log('   3. Enable "Less secure app access" or use App Passwords');
      console.log('   4. Verify your Gmail account settings');
    }
  }
};

// Run the test
testEmailService(); 