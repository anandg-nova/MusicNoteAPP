# Music Notation Backend

A Node.js/Express backend service for the Music Notation application, providing RESTful APIs for managing songs, collections, and user data.

## Features

- User authentication and authorization
- Song management (CRUD operations)
- Collection management
- MongoDB database integration
- JWT-based authentication
- Input validation
- Error handling
- API documentation

## Tech Stack

- Node.js v18+
- Express.js
- MongoDB with Mongoose
- TypeScript
- JWT for authentication
- Express Validator
- Jest for testing

## Project Structure

```
music-notation-backend/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.ts        # Application entry point
├── tests/               # Test files
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Prerequisites

- Node.js v18 or higher
- MongoDB v6 or higher
- npm v8 or higher

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd music-notation-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   # .env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/music-notation
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   ```

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## API Documentation

See [API_DOCUMENTATION.md](../docs/API_DOCUMENTATION.md) for detailed API documentation.

## Database Schema

### User Collection
```typescript
interface User {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  favorites: ObjectId[];
  collections: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Song Collection
```typescript
interface Song {
  _id: ObjectId;
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
  sections: SongSection[];
  tags: string[];
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface SongSection {
  name: string;
  order: number;
  lines: SongLine[];
}

interface SongLine {
  notes: string;
  chords: string;
  lyrics: string;
  order: number;
}
```

### Collection Collection
```typescript
interface Collection {
  _id: ObjectId;
  name: string;
  description: string;
  songs: ObjectId[];
  tags: string[];
  isPublic: boolean;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid token in the Authorization header:

```
Authorization: Bearer <token>
```

## Error Handling

The API uses a consistent error response format:

```json
{
  "message": "Error message",
  "errors": [
    {
      "field": "string",
      "message": "string"
    }
  ]
}
```

## Testing

The project uses Jest for testing. Tests are located in the `tests` directory.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Deployment

1. Update environment variables for production
2. Build the application:
   ```bash
   npm run build
   ```
3. Start the production server:
   ```bash
   npm start
   ```

### Production Checklist

- [ ] Update environment variables
- [ ] Set up MongoDB indexes
- [ ] Configure CORS
- [ ] Set up error monitoring
- [ ] Configure logging
- [ ] Set up SSL/TLS
- [ ] Configure rate limiting
- [ ] Set up backup strategy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Write tests
5. Update documentation
6. Create pull request

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/) 