const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'General'
  },
  tags: [String],
  imageUrl: String,
  summary: String,
  publishedAt: {
    type: Date,
    default: Date.now
  },
  readTime: {
    type: String,
    default: '5 min read'
  }
});

module.exports = mongoose.model('Blog', BlogSchema); 