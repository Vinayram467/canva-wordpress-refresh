const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import Blog model
const Blog = require('./models/Blog');

// Sample blog data
const sampleBlogs = require('./scripts/sampleBlogs');

// Function to seed the database
async function seedBlogs() {
  try {
    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('Cleared existing blogs');

    // Insert new blogs
    const insertedBlogs = await Blog.insertMany(sampleBlogs);
    console.log(`Successfully seeded ${insertedBlogs.length} blogs`);

    // Display the created blogs
    insertedBlogs.forEach(blog => {
      console.log(`- ${blog.title} by ${blog.author}`);
    });

  } catch (error) {
    console.error('Error seeding blogs:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeding function
seedBlogs(); 