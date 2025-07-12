const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  patientEmail: {
    type: String,
    required: true,
    trim: true
  },
  patientPhone: {
    type: String,
    required: true,
    trim: true
  },
  symptoms: {
    type: String,
    required: true,
    trim: true
  },
  medicalHistory: {
    type: String,
    trim: true
  },
  currentMedications: {
    type: String,
    trim: true
  },
  allergies: {
    type: String,
    trim: true
  },
  preferredDate: {
    type: Date,
    required: true
  },
  preferredTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Assessment', assessmentSchema); 