const express = require('express');
const Assessment = require('../models/Assessment');
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
    const assessment = new Assessment(req.body);
    const newAssessment = await assessment.save();
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