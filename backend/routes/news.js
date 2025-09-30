const express = require('express');
const axios = require('axios');
const { isContentfulEnabled, contentfulGraphQL, richTextToPlainText } = require('../services/contentful');

const router = express.Router();

// GET all news articles
router.get('/', async (req, res) => {
  try {
    if (isContentfulEnabled()) {
      const data = await contentfulGraphQL(`
        query GetNews($limit: Int = 50) {
          newsArticleCollection(limit: $limit, order: [publishedAt_DESC]) {
            items {
              sys { id }
              title
              metaTitle
              metaDescription
              excerpt
              content { json }
              heroImage { url }
              attachments { url }
              sourceName
              sourceUrl
              externalLinksCollection { items { ... on ExternalLink { label url } } }
              publishedAt
              isFeatured
            }
          }
        }
      `, { limit: 50 });

      const items = data?.newsArticleCollection?.items || [];
      const mapped = items.map((it) => ({
        _id: it.sys?.id,
        title: it.title,
        metaTitle: it.metaTitle || null,
        metaDescription: it.metaDescription || null,
        excerpt: it.excerpt || '',
        content: richTextToPlainText(it.content?.json) || '',
        image: it.heroImage?.url || null,
        attachments: it.attachments?.url ? [it.attachments.url] : [],
        sourceName: it.sourceName || '',
        sourceUrl: it.sourceUrl || '',
        externalLinks: (it.externalLinksCollection?.items || []).map((l) => ({ label: l?.label || 'Read article', url: l?.url || '' })).filter(l => !!l.url),
        publishedAt: it.publishedAt || new Date().toISOString(),
        isFeatured: !!it.isFeatured,
        category: 'News',
      }));
      return res.json(mapped);
    }

    // Fallback: NewsAPI (headlines) mapped into our structure if NEWSAPI_KEY is present
    const apiKey = process.env.NEWSAPI_KEY;
    if (apiKey) {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=health&language=en&pageSize=10&apiKey=${apiKey}`
      );
      const mapped = (response.data.articles || []).map(a => ({
        _id: a.url,
        title: a.title,
        excerpt: a.description || '',
        content: a.content || '',
        image: a.urlToImage || null,
        attachments: [],
        sourceName: a.source?.name || '',
        sourceUrl: a.url || '',
        publishedAt: a.publishedAt || new Date().toISOString(),
        isFeatured: false,
        category: 'News',
      }));
      return res.json(mapped);
    }

    return res.json([]);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET single news article by ID
router.get('/:id', async (req, res) => {
  try {
    if (isContentfulEnabled()) {
      const data = await contentfulGraphQL(`
        query GetNewsById($id: String!) {
          newsArticle(id: $id) {
            sys { id }
            title
            metaTitle
            metaDescription
            excerpt
            content { json }
            heroImage { url }
            attachments { url }
            sourceName
            sourceUrl
            externalLinksCollection { items { ... on ExternalLink { label url } } }
            publishedAt
            isFeatured
          }
        }
      `, { id: req.params.id });

      const it = data?.newsArticle;
      if (!it) {
        return res.status(404).json({ message: 'News not found' });
      }
      const mapped = {
        _id: it.sys?.id,
        title: it.title,
        metaTitle: it.metaTitle || null,
        metaDescription: it.metaDescription || null,
        excerpt: it.excerpt || '',
        content: richTextToPlainText(it.content?.json) || '',
        image: it.heroImage?.url || null,
        attachments: it.attachments?.url ? [it.attachments.url] : [],
        sourceName: it.sourceName || '',
        sourceUrl: it.sourceUrl || '',
        externalLinks: (it.externalLinksCollection?.items || []).map((l) => ({ label: l?.label || 'Read article', url: l?.url || '' })).filter(l => !!l.url),
        publishedAt: it.publishedAt || new Date().toISOString(),
        isFeatured: !!it.isFeatured,
        category: 'News',
      };
      return res.json(mapped);
    }

    // Fallback cannot fetch single item from NewsAPI by ID; return 404
    return res.status(404).json({ message: 'News not found' });
  } catch (error) {
    console.error('Error fetching news by id:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// Helper: fetch optional attachments and external links using a follow-up query
async function fetchOptionalFields(id) {
  const data = await contentfulGraphQL(`
    query GetNewsOptional($id: String!) {
      newsArticle(id: $id) {
        attachmentsCollection: linkedFrom {
          entriesCollection {
            items {
              __typename
            }
          }
        }
      }
    }
  `, { id });
  // The above is a placeholder; if Contentful schema exposes attachments/externalLinks as fields without collections,
  // you can extend this helper with specific follow-up queries as needed.
  return { attachments: [], externalLinks: [] };
}


