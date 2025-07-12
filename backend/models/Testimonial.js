const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  doctorName: String,
  date: {
    type: Date,
    default: Date.now
  },
  isApproved: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema); 