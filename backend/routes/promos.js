const express = require('express');
const { isContentfulEnabled, contentfulGraphQL } = require('../services/contentful');

const router = express.Router();

// GET all active promo widgets (optionally filtered by placement)
router.get('/', async (req, res) => {
	try {
		const { placement } = req.query;
		if (isContentfulEnabled()) {
			const data = await contentfulGraphQL(
				`
					query GetPromos($limit:Int = 50) {
						promoWidgetCollection(limit: $limit, order: [priority_DESC]) {
							items {
								sys { id }
								title
                    image { url }
                    url
                    ctaLabel
                    placement
                    isActive
                    priority
                    openInNewTab
                    nofollow
							}
						}
					}
				`,
				{ limit: 50 }
			);

			const now = Date.now();
			let items = (data?.promoWidgetCollection?.items || []).map((it) => ({
				_id: it.sys?.id,
				title: it.title,
				image: it.image?.url || null,
				url: it.url || '',
				ctaLabel: it.ctaLabel || 'Learn More',
				placement: it.placement || 'sidebarTop',
				isActive: !!it.isActive,
				priority: typeof it.priority === 'number' ? it.priority : 0,
				openInNewTab: !!it.openInNewTab,
				nofollow: !!it.nofollow,
			}));

            // Filter active only (scheduling optional and not in schema now)
            items = items.filter((p) => p.isActive);

			// Optional placement filter
			if (placement) {
				items = items.filter((p) => p.placement === placement);
			}

			// Sort by priority desc
			items.sort((a, b) => (b.priority || 0) - (a.priority || 0));
			return res.json(items);
		}

		// If Contentful not enabled, return empty list
		return res.json([]);
	} catch (error) {
		console.error('Error fetching promos:', error);
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
