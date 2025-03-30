import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { auth } from '../middleware/auth';
import { Collection } from '../models/Collection';
import { JwtPayload } from '../services/jwtService';
import { Types } from 'mongoose';

const router = express.Router();

// Extend Request type to include user
interface AuthRequest extends Request {
  user?: JwtPayload;
}

// Validation middleware
const collectionValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('isPublic').optional().isBoolean().withMessage('isPublic must be a boolean'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
];

const addSongValidation = [
  body('songId').notEmpty().withMessage('Song ID is required'),
];

// Routes
router.get('/', async (_req: Request, res: Response) => {
  try {
    const collections = await Collection.find().populate('createdBy', 'username name');
    return res.json(collections);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching collections' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const collection = await Collection.findById(req.params.id)
      .populate('createdBy', 'username name')
      .populate('songs', 'title artist');
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    return res.json(collection);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching collection' });
  }
});

router.post('/', auth, collectionValidation, async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const collection = new Collection({
      ...req.body,
      createdBy: new Types.ObjectId(req.user.userId)
    });
    await collection.save();
    return res.status(201).json(collection);
  } catch (error) {
    return res.status(400).json({ message: 'Error creating collection' });
  }
});

router.put('/:id', auth, collectionValidation, async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    if (collection.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this collection' });
    }
    Object.assign(collection, req.body);
    await collection.save();
    return res.json(collection);
  } catch (error) {
    return res.status(400).json({ message: 'Error updating collection' });
  }
});

router.delete('/:id', auth, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    if (collection.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this collection' });
    }
    await Collection.deleteOne({ _id: req.params.id });
    return res.json({ message: 'Collection removed' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting collection' });
  }
});

router.post('/:id/songs', auth, addSongValidation, async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    if (collection.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to modify this collection' });
    }
    collection.songs.push(new Types.ObjectId(req.body.songId));
    await collection.save();
    return res.json(collection);
  } catch (error) {
    return res.status(400).json({ message: 'Error adding song to collection' });
  }
});

router.delete('/:id/songs/:songId', auth, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    if (collection.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to modify this collection' });
    }
    collection.songs = collection.songs.filter(
      (songId) => songId.toString() !== req.params.songId
    );
    await collection.save();
    return res.json(collection);
  } catch (error) {
    return res.status(400).json({ message: 'Error removing song from collection' });
  }
});

export default router;

 