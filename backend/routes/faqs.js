const express = require('express');
const FAQ = require('../models/FAQ');
const router = express.Router();

// GET all FAQs
router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET single FAQ by ID
router.get('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json(faq);
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST new FAQ
router.post('/', async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    const newFAQ = await faq.save();
    res.status(201).json(newFAQ);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update FAQ
router.put('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json(faq);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE FAQ
router.delete('/:id', async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 