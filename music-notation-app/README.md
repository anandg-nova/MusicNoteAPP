# Music Notation Application

A modern web application for creating, managing, and sharing music notation. The application supports various music notation types including Western, Carnatic, and Hindustani music.

## Features

- Create and edit music sheets
- Support for multiple notation types (Western, Carnatic, Hindustani)
- Organize songs into collections
- User authentication and authorization
- Real-time updates
- Responsive design
- Mobile-friendly interface

## Project Structure

```
music-notation-app/
├── docs/                    # Documentation
│   └── TECHNICAL_DOCUMENTATION.md
├── src/                    # Frontend source code
│   ├── components/        # React components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom hooks
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
└── music-notation-backend/ # Backend source code
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   ├── middleware/   # Custom middleware
    │   └── config/       # Configuration files
    └── tests/            # Backend tests
```

## Getting Started

### Prerequisites

- Node.js v22.12.0 or higher
- MongoDB 8.0.6 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd music-notation-app
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd music-notation-backend
npm install
```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the variables as needed

### Running the Application

1. Start MongoDB:
```bash
brew services start mongodb-community
```

2. Start the backend server:
```bash
cd music-notation-backend
npm run dev
```

3. Start the frontend development server:
```bash
cd music-notation-app
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Documentation

Detailed technical documentation is available in the `docs` directory:
- [Technical Documentation](docs/TECHNICAL_DOCUMENTATION.md)
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the component library
- MongoDB for the database
- React team for the frontend framework
- Express team for the backend framework
