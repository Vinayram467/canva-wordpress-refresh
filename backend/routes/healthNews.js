const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const apiKey = process.env.NEWSAPI_KEY;
    console.log("Using NEWSAPI_KEY:", apiKey); // Debug log
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=health&language=en&pageSize=10&apiKey=${apiKey}`
    );
    const headlines = response.data.articles.map(article => article.title);
    res.json({ headlines });
  } catch (error) {
    console.error("NewsAPI fetch error:", error.response ? error.response.data : error.message); // Debug log
    res.status(500).json({ error: 'Failed to fetch health news' });
  }
});

module.exports = router; 