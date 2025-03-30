# Music Notation Application - Technical Documentation

## Table of Contents
1. [Tech Stack Overview](#tech-stack-overview)
2. [Architecture](#architecture)
3. [Component Interactions](#component-interactions)
4. [Database Schema](#database-schema)
5. [API Documentation](#api-documentation)
6. [Security](#security)
7. [Development Setup](#development-setup)
8. [Deployment](#deployment)

## Tech Stack Overview

### Frontend
1. **Core Technologies**
   - React 18.2.0 (Frontend Framework)
   - TypeScript 4.9.5 (Type Safety)
   - Material-UI (MUI) v5.15.10 (UI Components)

2. **Key Components**
   - `App.tsx`: Main application component
   - `LandingPage.tsx`: Home page with song list
   - `SongEditor.tsx`: Song creation/editing interface
   - `SongMetadata.tsx`: Song details display
   - `MusicSheet.tsx`: Music notation display

3. **State Management**
   - React Context API for global state
   - Local state with useState hooks
   - Custom hooks for data fetching

### Backend
1. **Core Technologies**
   - Node.js with Express
   - TypeScript
   - MongoDB 8.0.6 (Database)
   - Mongoose (ODM)

2. **Key Components**
   - Controllers (userController, songController, collectionController)
   - Models (User, Song, Collection)
   - Routes (userRoutes, songRoutes, collectionRoutes)
   - Middleware (auth, validation)

## Architecture

### Frontend Architecture
```
src/
├── components/
│   ├── App.tsx
│   ├── LandingPage.tsx
│   ├── SongEditor.tsx
│   ├── SongMetadata.tsx
│   └── MusicSheet.tsx
├── contexts/
│   └── AuthContext.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useSongs.ts
├── types/
│   └── index.ts
└── utils/
    └── api.ts
```

### Backend Architecture
```
src/
├── controllers/
│   ├── userController.ts
│   ├── songController.ts
│   └── collectionController.ts
├── models/
│   ├── User.ts
│   ├── Song.ts
│   └── Collection.ts
├── routes/
│   ├── userRoutes.ts
│   ├── songRoutes.ts
│   └── collectionRoutes.ts
├── middleware/
│   └── auth.ts
└── config/
    └── database.ts
```

## Component Interactions

### Authentication Flow
1. User Registration
   - Frontend sends registration data
   - Backend validates and creates user
   - JWT token is returned
   - Frontend stores token

2. User Login
   - Frontend sends credentials
   - Backend validates and returns token
   - Frontend stores token

3. Protected Routes
   - Frontend includes token in requests
   - Backend validates token
   - Access granted/denied

### Song Management Flow
1. Song Listing
   - Frontend requests songs
   - Backend queries database
   - Songs returned to frontend
   - Frontend displays songs

2. Song Creation
   - Frontend collects song data
   - Backend validates and saves
   - New song returned to frontend
   - UI updates

3. Song Editing
   - Frontend loads song data
   - User makes changes
   - Changes sent to backend
   - Database updated
   - UI refreshed

### Collection Management Flow
1. Collection Listing
   - Frontend requests collections
   - Backend queries database
   - Collections returned
   - Frontend displays

2. Collection Creation
   - Frontend collects data
   - Backend creates collection
   - New collection returned
   - UI updates

3. Song Addition to Collection
   - Frontend sends song ID
   - Backend updates collection
   - Updated collection returned
   - UI refreshed

## Database Schema

### User Collection
```typescript
{
  username: string;
  email: string;
  password: string;
  name: string;
  role: string;
  favorites: ObjectId[];
  collections: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Song Collection
```typescript
{
  title: string;
  artist: string;
  album: string;
  notationType: string;
  aarohana: string;
  avarohana: string;
  tempo: string;
  timeSignature: string;
  raga: string;
  taal: string;
  createdBy: ObjectId;
  isPublic: boolean;
  sections: {
    name: string;
    order: number;
    lines: {
      notes: string;
      chords: string;
      lyrics: string;
      order: number;
    }[];
  }[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Collection Collection
```typescript
{
  name: string;
  description: string;
  createdBy: ObjectId;
  songs: ObjectId[];
  isPublic: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

## API Documentation

### Authentication Endpoints
- `POST /api/users/register`: Register new user
- `POST /api/users/login`: User login
- `GET /api/users/profile`: Get user profile
- `PUT /api/users/profile`: Update user profile

### Song Endpoints
- `GET /api/songs`: Get all songs
- `GET /api/songs/:id`: Get song by ID
- `POST /api/songs`: Create new song
- `PUT /api/songs/:id`: Update song
- `DELETE /api/songs/:id`: Delete song
- `POST /api/songs/:id/favorite`: Toggle favorite

### Collection Endpoints
- `GET /api/collections`: Get all collections
- `GET /api/collections/:id`: Get collection by ID
- `POST /api/collections`: Create collection
- `PUT /api/collections/:id`: Update collection
- `DELETE /api/collections/:id`: Delete collection
- `POST /api/collections/:id/songs`: Add song to collection
- `DELETE /api/collections/:id/songs/:songId`: Remove song from collection

## Security

### Authentication
- JWT-based authentication
- Token validation
- Session management
- Password hashing with bcrypt

### Authorization
- Role-based access control
- Resource ownership
- Permission checks
- API security

### Data Protection
- Input validation
- Data sanitization
- XSS prevention
- CSRF protection

## Development Setup

### Prerequisites
- Node.js v22.12.0 or higher
- MongoDB 8.0.6 or higher
- npm or yarn

### Frontend Setup
```bash
cd music-notation-app
npm install
npm start
```

### Backend Setup
```bash
cd music-notation-backend
npm install
npm run dev
```

### Environment Variables
```env
# Frontend
REACT_APP_API_URL=http://localhost:5000/api

# Backend
PORT=5000
MONGODB_URI=mongodb://localhost:27017/music-notation
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Deployment

### Frontend Deployment
1. Build the application
```bash
npm run build
```

2. Deploy to hosting service (e.g., Vercel, Netlify)

### Backend Deployment
1. Set up MongoDB Atlas cluster
2. Configure environment variables
3. Deploy to hosting service (e.g., Heroku, DigitalOcean)

### Database Deployment
1. Create MongoDB Atlas account
2. Set up cluster
3. Configure network access
4. Create database user
5. Update connection string

## Performance Optimization

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Caching strategies

### Backend
- Database indexing
- Query optimization
- Caching
- Rate limiting

### Database
- Indexed fields
- Query optimization
- Connection pooling
- Regular maintenance

## Monitoring and Maintenance

### Monitoring
- Error tracking
- Performance monitoring
- User analytics
- Server metrics

### Maintenance
- Regular updates
- Security patches
- Database backups
- Performance optimization

## Future Enhancements

### Planned Features
1. Real-time collaboration
2. Advanced search
3. Music playback
4. Sheet music export
5. Mobile application

### Technical Improvements
1. GraphQL integration
2. WebSocket support
3. Progressive Web App
4. Offline support
5. Enhanced security 