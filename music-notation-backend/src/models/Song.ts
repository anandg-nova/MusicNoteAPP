import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: string;
  album: string;
  notationType: 'western' | 'carnatic' | 'hindustani';
  aarohana: string;
  avarohana: string;
  tempo: string;
  timeSignature: string;
  createdBy: mongoose.Types.ObjectId;
  isPublic: boolean;
  sections: {
    name: string;
    lines: {
      notes: string;
      chords: string;
      lyrics: string;
      order: number;
    }[];
    order: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  tags: string[];
  raga?: string;
  taal?: string;
}

const songSchema = new Schema<ISong>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
  },
  album: {
    type: String,
    required: true,
    trim: true,
  },
  notationType: {
    type: String,
    enum: ['western', 'carnatic', 'hindustani'],
    required: true,
  },
  aarohana: {
    type: String,
    required: true,
    trim: true,
  },
  avarohana: {
    type: String,
    required: true,
    trim: true,
  },
  tempo: {
    type: String,
    required: true,
    trim: true,
  },
  timeSignature: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  sections: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lines: [{
      notes: {
        type: String,
        required: true,
        trim: true,
      },
      chords: {
        type: String,
        required: true,
        trim: true,
      },
      lyrics: {
        type: String,
        required: true,
        trim: true,
      },
      order: {
        type: Number,
        required: true,
      },
    }],
    order: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  tags: [{
    type: String,
    trim: true,
  }],
  raga: {
    type: String,
    trim: true,
  },
  taal: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
songSchema.index({ title: 'text', artist: 'text', album: 'text' });
songSchema.index({ createdBy: 1, isPublic: 1 });
songSchema.index({ tags: 1 });
songSchema.index({ notationType: 1 });

export const Song = mongoose.model<ISong>('Song', songSchema); 