const express = require('express');
const Update = require('../models/Update');
const router = express.Router();

// GET all updates
router.get('/', async (req, res) => {
  try {
    const updates = await Update.find();
    res.json(updates);
  } catch (error) {
    console.error('Error fetching updates:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET single update by ID
router.get('/:id', async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);
    if (!update) {
      return res.status(404).json({ message: 'Update not found' });
    }
    res.json(update);
  } catch (error) {
    console.error('Error fetching update:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST new update
router.post('/', async (req, res) => {
  try {
    const update = new Update(req.body);
    const newUpdate = await update.save();
    res.status(201).json(newUpdate);
  } catch (error) {
    console.error('Error creating update:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update update
router.put('/:id', async (req, res) => {
  try {
    const update = await Update.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!update) {
      return res.status(404).json({ message: 'Update not found' });
    }
    res.json(update);
  } catch (error) {
    console.error('Error updating update:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE update
router.delete('/:id', async (req, res) => {
  try {
    const update = await Update.findByIdAndDelete(req.params.id);
    if (!update) {
      return res.status(404).json({ message: 'Update not found' });
    }
    res.json({ message: 'Update deleted successfully' });
  } catch (error) {
    console.error('Error deleting update:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 