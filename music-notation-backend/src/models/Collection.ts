import mongoose, { Document, Schema } from 'mongoose';

export interface ICollection extends Document {
  name: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  songs: mongoose.Types.ObjectId[];
  isPublic: boolean;
  tags: string[];
}

const collectionSchema = new Schema<ICollection>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song',
  }],
  isPublic: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
});

// Indexes for better query performance
collectionSchema.index({ name: 'text', description: 'text' });
collectionSchema.index({ createdBy: 1, isPublic: 1 });
collectionSchema.index({ tags: 1 });

export const Collection = mongoose.model<ICollection>('Collection', collectionSchema); 