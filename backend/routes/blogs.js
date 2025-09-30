const express = require('express');
const Blog = require('../models/Blog');
const { isContentfulEnabled, contentfulGraphQL } = require('../services/contentful');
const router = express.Router();

// GET all blogs
router.get('/', async (req, res) => {
  try {
    if (isContentfulEnabled()) {
      const data = await contentfulGraphQL(`
        query GetBlogPosts($limit: Int = 50) {
          blogPostCollection(limit: $limit, order: [publishedAt_DESC]) {
            items {
              sys { id }
              title
              content
              excerpt
              author
              category
              imageUrl: heroImage { url }
              publishedAt
              readTime: readingTimeMinutes
              isFeatured
            }
          }
        }
      `, { limit: 50 });

      const items = data?.blogPostCollection?.items || [];
      const mapped = items.map((it) => ({
        _id: it.sys?.id,
        title: it.title,
        content: it.content || '',
        author: it.author || 'Unknown',
        category: it.category || 'General',
        tags: [],
        imageUrl: it.imageUrl?.url || null,
        summary: it.excerpt || '',
        publishedAt: it.publishedAt || new Date().toISOString(),
        readTime: it.readTime ? `${it.readTime} min read` : '5 min read',
        isFeatured: !!it.isFeatured,
      }));
      return res.json(mapped);
    }

    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET single blog by ID
router.get('/:id', async (req, res) => {
  try {
    if (isContentfulEnabled()) {
      const data = await contentfulGraphQL(`
        query GetBlogById($id: String!) {
          blogPost(id: $id) {
            sys { id }
            title
            content
            excerpt
            author
            category
            imageUrl: heroImage { url }
            publishedAt
            readTime: readingTimeMinutes
            isFeatured
          }
        }
      `, { id: req.params.id });

      const it = data?.blogPost;
      if (!it) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      const mapped = {
        _id: it.sys?.id,
        title: it.title,
        content: it.content || '',
        author: it.author || 'Unknown',
        category: it.category || 'General',
        tags: [],
        imageUrl: it.imageUrl?.url || null,
        summary: it.excerpt || '',
        publishedAt: it.publishedAt || new Date().toISOString(),
        readTime: it.readTime ? `${it.readTime} min read` : '5 min read',
        isFeatured: !!it.isFeatured,
      };
      return res.json(mapped);
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST new blog
router.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update blog
router.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE blog
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 