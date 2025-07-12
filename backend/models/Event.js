const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  organizer: String,
  imageUrl: String,
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Event', EventSchema); 