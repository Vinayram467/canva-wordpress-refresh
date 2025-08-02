const express = require('express');
const Consultation = require('../models/Consultation');
const emailService = require('../services/emailService');
const router = express.Router();

// GET all consultations
router.get('/', async (req, res) => {
  try {
    const consultations = await Consultation.find();
    res.json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET single consultation by ID
router.get('/:id', async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.json(consultation);
  } catch (error) {
    console.error('Error fetching consultation:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST new consultation
router.post('/', async (req, res) => {
  try {
    const consultation = new Consultation(req.body);
    const newConsultation = await consultation.save();
    
    // Send confirmation email to user
    try {
      await emailService.sendUserConfirmation(req.body, 'consultation');
      console.log('User confirmation email sent successfully');
    } catch (emailError) {
      console.error('Error sending user confirmation email:', emailError);
    }
    
    // Send notification email to admin
    try {
      await emailService.sendAdminNotification(req.body, 'consultation');
      console.log('Admin notification email sent successfully');
    } catch (emailError) {
      console.error('Error sending admin notification email:', emailError);
    }
    
    res.status(201).json(newConsultation);
  } catch (error) {
    console.error('Error creating consultation:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update consultation
router.put('/:id', async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.json(consultation);
  } catch (error) {
    console.error('Error updating consultation:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE consultation
router.delete('/:id', async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndDelete(req.params.id);
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.json({ message: 'Consultation deleted successfully' });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 