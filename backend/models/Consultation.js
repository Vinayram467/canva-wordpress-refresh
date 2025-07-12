const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  patientEmail: {
    type: String,
    required: true
  },
  patientPhone: String,
  doctorId: String,
  consultationType: {
    type: String,
    enum: ['video', 'audio', 'chat'],
    default: 'video'
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: String
});

module.exports = mongoose.model('Consultation', ConsultationSchema); 