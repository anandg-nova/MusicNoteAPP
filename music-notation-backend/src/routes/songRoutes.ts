import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth';
import { Song } from '../models/Song';
import { User } from '../models/User';

const router = express.Router();

// Validation middleware
const songValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('artist').trim().notEmpty().withMessage('Artist is required'),
  body('album').trim().notEmpty().withMessage('Album is required'),
  body('notationType')
    .isIn(['western', 'carnatic', 'hindustani'])
    .withMessage('Invalid notation type'),
  body('aarohana').trim().notEmpty().withMessage('Aarohana is required'),
  body('avarohana').trim().notEmpty().withMessage('Avarohana is required'),
  body('tempo').trim().notEmpty().withMessage('Tempo is required'),
  body('timeSignature').trim().notEmpty().withMessage('Time signature is required'),
  body('sections').isArray().withMessage('Sections must be an array'),
  body('sections.*.name').trim().notEmpty().withMessage('Section name is required'),
  body('sections.*.lines').isArray().withMessage('Lines must be an array'),
  body('sections.*.lines.*.notes').trim().notEmpty().withMessage('Notes are required'),
  body('sections.*.lines.*.chords').trim().notEmpty().withMessage('Chords are required'),
  body('sections.*.lines.*.lyrics').trim().notEmpty().withMessage('Lyrics are required'),
  body('sections.*.lines.*.order').isInt().withMessage('Order must be an integer'),
  body('sections.*.order').isInt().withMessage('Order must be an integer'),
];

// Get all songs
router.get('/', async (_req: Request, res: Response) => {
  try {
    const songs = await Song.find().populate('createdBy', 'name');
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching songs' });
  }
});

// Get song by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const song = await Song.findById(req.params.id).populate('createdBy', 'name');
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    return res.json(song);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching song' });
  }
});

// Create song
router.post('/', auth, songValidation, async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    
    // Handle both userId and createdBy fields
    const { userId, createdBy, ...rest } = req.body;
    const song = new Song({
      ...rest,
      createdBy: req.user.userId
    });
    
    await song.save();
    return res.status(201).json(song);
  } catch (error) {
    console.error('Error creating song:', error);
    return res.status(400).json({ 
      message: 'Error creating song',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Update song
router.put('/:id', auth, songValidation, async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    if (song.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this song' });
    }
    Object.assign(song, req.body);
    await song.save();
    return res.json(song);
  } catch (error) {
    return res.status(400).json({ message: 'Error updating song' });
  }
});

// Delete song
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    if (song.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this song' });
    }
    await Song.deleteOne({ _id: req.params.id });
    return res.json({ message: 'Song removed' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting song' });
  }
});

// Toggle favorite
router.post('/:id/favorite', auth, async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const favoriteIndex = user.favorites.indexOf(song._id);
    if (favoriteIndex === -1) {
      user.favorites.push(song._id);
    } else {
      user.favorites.splice(favoriteIndex, 1);
    }
    
    await user.save();
    return res.json({ favorites: user.favorites });
  } catch (error) {
    return res.status(500).json({ message: 'Error toggling favorite' });
  }
});

export default router; 