# Development Guide

## Project Structure

```
music-notation-app/
├── docs/                    # Documentation
│   ├── API_DOCUMENTATION.md # API endpoints documentation
│   └── DEVELOPMENT_GUIDE.md # This file
├── src/
│   ├── components/         # React components
│   │   ├── common/        # Reusable UI components
│   │   ├── layout/        # Layout components
│   │   └── features/      # Feature-specific components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   ├── store/             # State management
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── App.tsx            # Root component
├── public/                # Static assets
├── tests/                 # Test files
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v8 or higher
- MongoDB v6 or higher
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd music-notation-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment files:
   ```bash
   # .env.development
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_MONGODB_URI=mongodb://localhost:27017/music-notation
   ```

### Development Workflow

1. Start the development server:
   ```bash
   npm start
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Code Style Guide

### TypeScript

- Use TypeScript for all new code
- Define interfaces for all data structures
- Use type inference when possible
- Avoid using `any` type

Example:
```typescript
interface Song {
  id: string;
  title: string;
  artist: string;
  sections: SongSection[];
}

const SongComponent: React.FC<{ song: Song }> = ({ song }) => {
  // Component implementation
};
```

### React Components

- Use functional components with hooks
- Follow the single responsibility principle
- Implement proper prop types
- Use React.memo for performance optimization when needed

Example:
```typescript
const SongEditor: React.FC<SongEditorProps> = React.memo(({ song, onSave }) => {
  const [editedSong, setEditedSong] = useState(song);
  
  const handleSave = useCallback(() => {
    onSave(editedSong);
  }, [editedSong, onSave]);

  return (
    // Component JSX
  );
});
```

### State Management

- Use React Context for global state
- Implement custom hooks for reusable logic
- Keep state as local as possible

Example:
```typescript
const useSongState = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSongs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.getSongs();
      setSongs(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { songs, loading, error, fetchSongs };
};
```

### API Integration

- Use axios for API calls
- Implement proper error handling
- Use interceptors for common operations

Example:
```typescript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const songService = {
  getSongs: () => api.get<Song[]>('/songs'),
  createSong: (song: Omit<Song, 'id'>) => api.post<Song>('/songs', song),
  updateSong: (id: string, song: Partial<Song>) => 
    api.put<Song>(`/songs/${id}`, song),
  deleteSong: (id: string) => api.delete(`/songs/${id}`),
};
```

### Testing

- Write unit tests for components
- Use React Testing Library
- Mock API calls
- Test error scenarios

Example:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { SongEditor } from './SongEditor';

describe('SongEditor', () => {
  const mockSong = {
    id: '1',
    title: 'Test Song',
    artist: 'Test Artist',
    sections: [],
  };

  const mockOnSave = jest.fn();

  beforeEach(() => {
    render(<SongEditor song={mockSong} onSave={mockOnSave} />);
  });

  it('renders song details', () => {
    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
  });

  it('calls onSave when save button is clicked', () => {
    fireEvent.click(screen.getByText('Save'));
    expect(mockOnSave).toHaveBeenCalledWith(mockSong);
  });
});
```

### Git Workflow

1. Create feature branches from `develop`
2. Use conventional commits
3. Create pull requests for review
4. Merge to `develop` after approval
5. Release from `develop` to `main`

Example commit messages:
```
feat: add song editor component
fix: resolve type error in SongMetadata
docs: update API documentation
style: format code according to guidelines
```

## Performance Optimization

### Code Splitting

- Use React.lazy for route-based code splitting
- Implement dynamic imports for large components

Example:
```typescript
const SongEditor = React.lazy(() => import('./components/SongEditor'));
const SongList = React.lazy(() => import('./components/SongList'));

const App: React.FC = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/editor" element={<SongEditor />} />
      <Route path="/songs" element={<SongList />} />
    </Routes>
  </Suspense>
);
```

### Memoization

- Use useMemo for expensive computations
- Use useCallback for event handlers
- Implement React.memo for pure components

Example:
```typescript
const SongList: React.FC<{ songs: Song[] }> = React.memo(({ songs }) => {
  const sortedSongs = useMemo(() => 
    [...songs].sort((a, b) => a.title.localeCompare(b.title)),
    [songs]
  );

  const handleSongClick = useCallback((songId: string) => {
    // Handle song click
  }, []);

  return (
    // Render sorted songs
  );
});
```

## Deployment

### Production Build

1. Update environment variables:
   ```bash
   # .env.production
   REACT_APP_API_URL=https://api.example.com
   REACT_APP_MONGODB_URI=mongodb://production-uri
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. Test the production build:
   ```bash
   serve -s build
   ```

### Deployment Checklist

- [ ] Update environment variables
- [ ] Run tests
- [ ] Build application
- [ ] Test production build
- [ ] Deploy to hosting service
- [ ] Verify deployment
- [ ] Monitor error tracking
- [ ] Check performance metrics

## Troubleshooting

### Common Issues

1. **TypeScript Errors**
   - Check type definitions
   - Update dependencies
   - Clear TypeScript cache

2. **Build Failures**
   - Check for syntax errors
   - Verify dependencies
   - Clear build cache

3. **API Connection Issues**
   - Verify environment variables
   - Check network connectivity
   - Validate API endpoints

### Debugging Tools

- React Developer Tools
- Chrome DevTools
- Network tab for API calls
- Console for errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Write tests
5. Update documentation
6. Create pull request

## Resources

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Material-UI Documentation](https://mui.com/)
- [MongoDB Documentation](https://www.mongodb.com/docs/) 