const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  qualifications: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  bio: String,
  imageUrl: String,
  contact: {
    email: String,
    phone: String
  },
  consultationFee: {
    type: String,
    default: '₹500'
  },
  availability: {
    type: String,
    default: 'Monday to Friday'
  }
});

module.exports = mongoose.model('Doctor', DoctorSchema); 