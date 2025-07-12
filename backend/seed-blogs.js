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
const sampleBlogs = [
  {
    title: "Understanding Heart Health: A Complete Guide",
    content: "Heart disease remains one of the leading causes of death worldwide. Understanding how to maintain a healthy heart is crucial for everyone. This comprehensive guide covers everything from diet and exercise to stress management and regular check-ups. We'll explore the latest research on cardiovascular health and provide practical tips for maintaining a strong, healthy heart throughout your life.",
    summary: "Learn about the essential steps to maintain a healthy heart, including diet, exercise, and lifestyle changes that can significantly reduce your risk of heart disease.",
    author: "Dr. Sarah Johnson",
    category: "Cardiology",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    readTime: "8 min read",
    date: new Date("2024-01-15"),
    tags: ["heart health", "cardiology", "prevention", "wellness"]
  },
  {
    title: "The Future of Telemedicine: Revolutionizing Healthcare",
    content: "Telemedicine has transformed the way we access healthcare, especially during the COVID-19 pandemic. This technology allows patients to receive medical care from the comfort of their homes, reducing the need for in-person visits and making healthcare more accessible to everyone. We explore the benefits, challenges, and future prospects of telemedicine in modern healthcare.",
    summary: "Discover how telemedicine is changing the healthcare landscape and making medical care more accessible and convenient for patients worldwide.",
    author: "Dr. Michael Chen",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    readTime: "6 min read",
    date: new Date("2024-01-10"),
    tags: ["telemedicine", "healthcare technology", "digital health", "innovation"]
  },
  {
    title: "Nutrition Myths Debunked: What Science Really Says",
    content: "There's a lot of misinformation about nutrition circulating online. This article separates fact from fiction by examining the latest scientific research on common nutrition myths. From the truth about carbs and fats to the real benefits of superfoods, we provide evidence-based information to help you make informed dietary choices.",
    summary: "Get the facts about common nutrition myths and learn what scientific research actually says about healthy eating habits.",
    author: "Dr. Emily Rodriguez",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop",
    readTime: "10 min read",
    date: new Date("2024-01-05"),
    tags: ["nutrition", "diet", "health myths", "scientific research"]
  },
  {
    title: "Mental Health Awareness: Breaking the Stigma",
    content: "Mental health is just as important as physical health, yet it's often overlooked or stigmatized. This article discusses the importance of mental health awareness, common mental health conditions, and how to support yourself and others. We also explore the connection between mental and physical health and provide resources for getting help.",
    summary: "Learn about the importance of mental health awareness and how to support yourself and others in maintaining good mental well-being.",
    author: "Dr. Lisa Thompson",
    category: "Mental Health",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    readTime: "7 min read",
    date: new Date("2024-01-01"),
    tags: ["mental health", "awareness", "stigma", "wellness"]
  },
  {
    title: "Exercise for All Ages: Staying Active Throughout Life",
    content: "Physical activity is essential at every stage of life, but the type and intensity of exercise should be appropriate for your age and fitness level. This guide provides age-specific exercise recommendations, from children to seniors, and explains the unique benefits of staying active at each life stage.",
    summary: "Discover age-appropriate exercise recommendations and learn how to stay active and healthy throughout your entire life.",
    author: "Dr. James Wilson",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    readTime: "9 min read",
    date: new Date("2023-12-28"),
    tags: ["exercise", "fitness", "aging", "health"]
  },
  {
    title: "Preventive Care: The Key to Long-Term Health",
    content: "Preventive care is the foundation of good health. Regular check-ups, screenings, and vaccinations can catch health issues early and prevent serious complications. This article explains the importance of preventive care, what screenings you need at different ages, and how to work with your healthcare provider to create a personalized prevention plan.",
    summary: "Understand the importance of preventive care and learn how regular check-ups and screenings can protect your long-term health.",
    author: "Dr. Robert Kim",
    category: "Preventive Care",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    readTime: "8 min read",
    date: new Date("2023-12-25"),
    tags: ["preventive care", "check-ups", "screenings", "health maintenance"]
  }
];

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