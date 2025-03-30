import { Request, Response } from 'express';
import { Collection } from '../models/Collection';
import { validationResult } from 'express-validator';

export const createCollection = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const collection = await Collection.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCollections = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const collections = await Collection.find(query)
      .populate('createdBy', 'username name')
      .populate('songs')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Collection.countDocuments(query);

    res.json({
      collections,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCollectionById = async (req: Request, res: Response) => {
  try {
    const collection = await Collection.findById(req.params.id)
      .populate('createdBy', 'username name')
      .populate('songs');
      
    if (collection) {
      res.json(collection);
    } else {
      res.status(404).json({ message: 'Collection not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCollection = async (req: Request, res: Response) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('songs');

    res.json(updatedCollection);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCollection = async (req: Request, res: Response) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Collection.findByIdAndDelete(req.params.id);
    res.json({ message: 'Collection removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addSongToCollection = async (req: Request, res: Response) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const songId = req.body.songId;
    if (!collection.songs.includes(songId)) {
      collection.songs.push(songId);
      await collection.save();
    }

    const updatedCollection = await Collection.findById(req.params.id)
      .populate('songs');

    res.json(updatedCollection);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeSongFromCollection = async (req: Request, res: Response) => {
  try {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    if (collection.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const songId = req.params.songId;
    collection.songs = collection.songs.filter(
      (id) => id.toString() !== songId
    );
    await collection.save();

    const updatedCollection = await Collection.findById(req.params.id)
      .populate('songs');

    res.json(updatedCollection);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 