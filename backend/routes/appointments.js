const express = require('express');
const Appointment = require('../models/Appointment');
const emailService = require('../services/emailService');
const router = express.Router();

// GET all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET single appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST new appointment
router.post('/', async (req, res) => {
  try {
    console.log('📝 Received appointment data:', req.body);
    
    // Map frontend field names to backend expected names
    const appointmentData = {
      patientName: req.body.patientName || req.body.name || '',
      email: req.body.email || req.body.patientEmail || req.body.userEmail || '',
      phone: req.body.phone || req.body.patientPhone || req.body.userPhone || '',
      date: req.body.date || req.body.appointmentDate || '',
      time: req.body.time || req.body.appointmentTime || '',
      reason: req.body.reason || req.body.message || '',
      doctorId: req.body.doctorId || '',
      status: req.body.status || 'pending',
      isUrgent: req.body.isUrgent || false,
      notes: req.body.notes || ''
    };
    
    console.log('📧 Mapped appointment data:', appointmentData);
    console.log('📧 Email field:', appointmentData.email);
    
    const appointment = new Appointment(appointmentData);
    const newAppointment = await appointment.save();
    
    // Send confirmation email to user
    try {
      await emailService.sendUserConfirmation(appointmentData, 'appointment');
      console.log('User confirmation email sent successfully');
    } catch (emailError) {
      console.error('Error sending user confirmation email:', emailError);
    }
    
    // Send notification email to admin
    try {
      await emailService.sendAdminNotification(appointmentData, 'appointment');
      console.log('Admin notification email sent successfully');
    } catch (emailError) {
      console.error('Error sending admin notification email:', emailError);
    }
    
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update appointment
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 