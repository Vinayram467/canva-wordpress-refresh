const express = require('express');
const Event = require('../models/Event');
const { isContentfulEnabled, contentfulGraphQL } = require('../services/contentful');
const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    if (isContentfulEnabled()) {
      const data = await contentfulGraphQL(`
        query GetEvents($limit: Int = 100) {
          eventCollection(limit: $limit, order: [startDateTime_ASC]) {
            items {
              sys { id }
              title
              description: content
              date: startDateTime
              time: endDateTime
              location: locationName
              image: heroImage { url }
              category: eventType
              isFeatured
            }
          }
        }
      `, { limit: 100 });
      const items = data?.eventCollection?.items || [];
      const mapped = items.map((it) => ({
        _id: it.sys?.id,
        title: it.title,
        description: it.description || '',
        date: it.date || '',
        time: it.time || '',
        location: it.location || '',
        image: it.image?.url || null,
        category: it.category || 'General',
        isFeatured: !!it.isFeatured,
      }));
      return res.json(mapped);
    }

    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET single event by ID
router.get('/:id', async (req, res) => {
  try {
    if (isContentfulEnabled()) {
      const data = await contentfulGraphQL(`
        query GetEventById($id: String!) {
          event(id: $id) {
            sys { id }
            title
            description: content
            date: startDateTime
            time: endDateTime
            location: locationName
            image: heroImage { url }
            category: eventType
            isFeatured
          }
        }
      `, { id: req.params.id });
      const it = data?.event;
      if (!it) {
        return res.status(404).json({ message: 'Event not found' });
      }
      const mapped = {
        _id: it.sys?.id,
        title: it.title,
        description: it.description || '',
        date: it.date || '',
        time: it.time || '',
        location: it.location || '',
        image: it.image?.url || null,
        category: it.category || 'General',
        isFeatured: !!it.isFeatured,
      };
      return res.json(mapped);
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST new event
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT update event
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(400).json({ message: error.message });
  }
});

// DELETE event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 