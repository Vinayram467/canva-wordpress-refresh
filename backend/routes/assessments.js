const express = require('express');
const Assessment = require('../models/Assessment');
const emailService = require('../services/emailService');
const router = express.Router();

// GET all assessments
router.get('/', async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json(assessments);
  } catch (error) {
    console.error('Error fetching assessments:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET single assessment by ID
router.get('/:id', async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    res.json(assessment);
  } catch (error) {
    console.error('Error fetching assessment:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST new assessment
router.post('/', async (req, res) => {
  try {
    console.log('📝 Received assessment data:', req.body);
    
    // Map frontend field names to backend expected names
    const assessmentData = {
      patientName: req.body.patientName || req.body.name || '',
      email: req.body.email || req.body.patientEmail || req.body.userEmail || '',
      phone: req.body.phone || req.body.patientPhone || req.body.userPhone || '',
      date: req.body.date || req.body.assessmentDate || '',
      time: req.body.time || req.body.assessmentTime || '',
      reason: req.body.reason || req.body.message || req.body.assessmentReason || '',
      symptoms: req.body.symptoms || req.body.symptomList || '',
      medicalHistory: req.body.medicalHistory || req.body.history || '',
      status: req.body.status || 'pending',
      type: req.body.type || 'general'
    };
    
    console.log('📧 Mapped assessment data:', assessmentData);
    console.log('📧 Email field:', assessmentData.email);
    
    const assessment = new Assessment(assessmentData);
    const newAssessment = await assessment.save();
    
    // Send confirmation email to user
    try {
      await emailService.sendUserConfirmation(assessmentData, 'assessment');
      console.log('User confirmation email sent successfully');
    } catch (emailError) {
      console.error('Error sending user confirmation email:', emailError);
    }
    
    // Send notification email to admin
    try {
      await emailService.sendAdminNotification(assessmentData, 'assessment');
      console.log('Admin notification email sent successfully');
    } catch (emailError) {
      console.error('Error sending admin notification email:', emailError);
    }
    
    res.status(201).json(newAssessment);
  } catch (error) {
    console.error('Error creating assessment:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update assessment
router.put('/:id', async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    res.json(assessment);
  } catch (error) {
    console.error('Error updating assessment:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE assessment
router.delete('/:id', async (req, res) => {
  try {
    const assessment = await Assessment.findByIdAndDelete(req.params.id);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    res.json({ message: 'Assessment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assessment:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 