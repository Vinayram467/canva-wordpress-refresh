const express = require('express');
const Message = require('../models/Message');
const emailService = require('../services/emailService');
const router = express.Router();

// GET all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET single message by ID
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST new message
router.post('/', async (req, res) => {
  try {
    console.log('📝 Received message data:', req.body);
    
    // Map frontend field names to backend expected names
    const messageData = {
      name: req.body.name || req.body.patientName || req.body.userName || '',
      email: req.body.email || req.body.patientEmail || req.body.userEmail || '',
      phone: req.body.phone || req.body.patientPhone || req.body.userPhone || '',
      message: req.body.message || req.body.reason || req.body.content || '',
      subject: req.body.subject || 'Contact Form Submission',
      status: req.body.status || 'unread'
    };
    
    console.log('📧 Mapped message data:', messageData);
    console.log('📧 Email field:', messageData.email);
    
    const message = new Message(messageData);
    const newMessage = await message.save();
    
    // Send confirmation email to user
    try {
      await emailService.sendUserConfirmation(messageData, 'contact');
      console.log('User confirmation email sent successfully');
    } catch (emailError) {
      console.error('Error sending user confirmation email:', emailError);
    }
    
    // Send notification email to admin
    try {
      await emailService.sendAdminNotification(messageData, 'contact');
      console.log('Admin notification email sent successfully');
    } catch (emailError) {
      console.error('Error sending admin notification email:', emailError);
    }
    
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update message
router.put('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 