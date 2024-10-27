import express from 'express';
import { Song } from '../models/song.js';
import { Artist } from '../models/artist.js';

const router = express.Router();

// Get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.findAll({
      include: [Artist]
    });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

// Get song by ID
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id, {
      include: [Artist]
    });
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch song' });
  }
});

// Get songs by artist ID
router.get('/artist/:artistId', async (req, res) => {
  try {
    const songs = await Song.findAll({
      where: { ArtistId: req.params.artistId },
      include: [Artist]
    });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch artist songs' });
  }
});

// Create song
router.post('/', async (req, res) => {
  try {
    const song = await Song.create(req.body);
    const songWithArtist = await Song.findByPk(song.id, {
      include: [Artist]
    });
    res.status(201).json(songWithArtist);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create song' });
  }
});

// Update song
router.put('/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    await song.update(req.body);
    const updatedSong = await Song.findByPk(song.id, {
      include: [Artist]
    });
    res.json(updatedSong);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update song' });
  }
});

// Delete song
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    await song.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete song' });
  }
});

export const songRoutes = router;