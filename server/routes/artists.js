import express from 'express';
import { Artist } from '../models/artist.js';
import { Song } from '../models/song.js';

const router = express.Router();

// Get all artists
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
});

// Get artist by ID
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artist' });
  }
});

// Create artist
router.post('/', async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create artist' });
  }
});

// Update artist
router.put('/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    await artist.update(req.body);
    res.json(artist);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update artist' });
  }
});

// Delete artist
router.delete('/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    await artist.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete artist' });
  }
});

export const artistRoutes = router;