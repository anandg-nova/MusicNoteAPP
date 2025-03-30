import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phoneNumber: string;
  otp: {
    code: string;
    expiresAt: Date;
  };
  isAdmin: boolean;
  favorites: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  otp: {
    code: String,
    expiresAt: Date
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Song'
  }]
}, {
  timestamps: true
});

export const User = mongoose.model<IUser>('User', userSchema); 