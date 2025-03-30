import { Request, Response } from 'express';
import { Song } from '../models/Song';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { JwtPayload } from '../services/jwtService';
import { User } from '../models/User';

interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export const createSong = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const now = new Date();
    const songData = {
      ...req.body,
      createdBy: new mongoose.Types.ObjectId(req.user.userId),
      sections: req.body.sections.map((section: any) => ({
        ...section,
        createdAt: now,
        updatedAt: now
      }))
    };

    const song = await Song.create(songData);
    res.status(201).json(song);
  } catch (error) {
    console.error('Error creating song:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getSongs = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = '', notationType } = req.query;
    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { artist: { $regex: search, $options: 'i' } },
        { album: { $regex: search, $options: 'i' } },
      ];
    }

    if (notationType) {
      query.notationType = notationType;
    }

    const songs = await Song.find(query)
      .populate('createdBy', 'username name')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Song.countDocuments(query);

    res.json({
      songs,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getSongById = async (req: Request, res: Response) => {
  try {
    const song = await Song.findById(req.params.id).populate('createdBy', 'username name');
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ message: 'Song not found' });
    }
  } catch (error) {
    console.error('Error fetching song:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateSong = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    if (song.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const now = new Date();
    const updateData = {
      ...req.body,
      updatedAt: now,
      sections: req.body.sections.map((section: any, index: number) => {
        const existingSection = song.sections[index];
        return {
          ...section,
          createdAt: existingSection?.createdAt || now,
          updatedAt: now
        };
      })
    };

    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    res.json(updatedSong);
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteSong = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    if (song.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: 'Song removed' });
  } catch (error) {
    console.error('Error deleting song:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const toggleFavorite = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const songId = new mongoose.Types.ObjectId(req.params.id);
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const songIndex = user.favorites.indexOf(songId);
    if (songIndex === -1) {
      user.favorites.push(songId);
    } else {
      user.favorites.splice(songIndex, 1);
    }

    await user.save();
    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 