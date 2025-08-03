const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    alias: 'patientEmail' // This allows both email and patientEmail to work
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    alias: 'patientPhone' // This allows both phone and patientPhone to work
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: false // Make it optional
  },
  date: {
    type: Date,
    required: true,
    alias: 'appointmentDate' // This allows both date and appointmentDate to work
  },
  time: {
    type: String,
    required: true,
    alias: 'appointmentTime' // This allows both time and appointmentTime to work
  },
  reason: {
    type: String,
    required: false,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  },
  isUrgent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema); 