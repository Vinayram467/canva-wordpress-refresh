const dotenv = require('dotenv');
const emailService = require('./services/emailService');

// Load environment variables
dotenv.config();

const testRenderEnvironment = async () => {
  console.log('🧪 Testing Render Environment...');
  console.log('📧 Email Configuration:');
  console.log('   Host:', process.env.EMAIL_HOST || 'NOT SET');
  console.log('   Port:', process.env.EMAIL_PORT || 'NOT SET');
  console.log('   User:', process.env.EMAIL_USER ? 'SET' : 'NOT SET');
  console.log('   Admin Email:', process.env.ADMIN_EMAIL || 'NOT SET');
  console.log('   Environment:', process.env.NODE_ENV || 'NOT SET');
  console.log('   MongoDB URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');

  // Check if we're in production (Render)
  if (process.env.NODE_ENV === 'production') {
    console.log('✅ Running in production mode (Render)');
  } else {
    console.log('⚠️  Running in development mode');
  }

  // Test data
  const testData = {
    patientName: 'Test Patient',
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
    console.log('✅ Your forms and email workflow should be working correctly!');
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    
    if (error.message.includes('Missing email credentials')) {
      console.log('\n💡 Solution:');
      console.log('   1. Make sure EMAIL_USER and EMAIL_PASS are set in Render environment variables');
      console.log('   2. For Gmail, use App Passwords, not your regular password');
      console.log('   3. Check that all required environment variables are configured in Render');
    } else if (error.message.includes('EAUTH')) {
      console.log('\n💡 Gmail Authentication Issue:');
      console.log('   1. Use Gmail App Passwords, not your regular password');
      console.log('   2. Enable 2-Step Verification on your Google account');
      console.log('   3. Generate an App Password for "Mail"');
    }
  }
};

// Run the test
testRenderEnvironment(); 