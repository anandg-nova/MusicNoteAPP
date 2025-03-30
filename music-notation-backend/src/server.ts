import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import songRoutes from './routes/songRoutes';
import collectionRoutes from './routes/collectionRoutes';
import healthRoutes from './routes/healthRoutes';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3002',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware should be before routes
app.use(errorHandler);

// API Routes with version prefix
const apiPrefix = `${process.env.API_PREFIX || '/api'}/${process.env.API_VERSION || 'v1'}`;
app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/songs`, songRoutes);
app.use(`${apiPrefix}/collections`, collectionRoutes);
app.use(`${apiPrefix}/health`, healthRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/music-notation')
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`API is available at http://localhost:${port}${apiPrefix}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit if MongoDB connection fails
  }); 