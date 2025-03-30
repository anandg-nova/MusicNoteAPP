import React, { useState, useEffect, useCallback } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { SongList } from './components/SongList';
import { SongEditor } from './components/SongEditor';
import { Navigation } from './components/Navigation';
import { Login } from './components/Login';
import { songService, authService } from './services/api';
import { Song, User } from './types/song';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'edit'>('list');
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      loadSongs();
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [checkAuth]);

  const loadSongs = async () => {
    try {
      const data = await songService.getAll();
      setSongs(data);
    } catch (error) {
      console.error('Failed to load songs:', error);
    }
  };

  const handleEditSong = (songId: string) => {
    const song = songs.find(s => s._id === songId);
    if (song) {
      setEditingSong(song);
      setCurrentView('edit');
    }
  };

  const handleAddSong = () => {
    setEditingSong(null);
    setCurrentView('edit');
  };

  const handleSaveSong = async (song: Song) => {
    try {
      if (song._id) {
        await songService.update(song._id, song);
      } else {
        await songService.create(song);
      }
      await loadSongs();
      setCurrentView('list');
      setEditingSong(null);
    } catch (error) {
      console.error('Failed to save song:', error);
    }
  };

  const handleDeleteSong = async (id: string) => {
    try {
      await songService.delete(id);
      await loadSongs();
    } catch (error) {
      console.error('Failed to delete song:', error);
    }
  };

  const handleNavigate = (view: string) => {
    if (view === 'list' || view === 'edit') {
      setCurrentView(view as 'list' | 'edit');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {user ? (
          <>
            <Navigation
              onNavigate={handleNavigate}
              onLogout={() => {
                authService.logout();
                setUser(null);
              }}
              userName={user.name}
            />
            <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
              {currentView === 'list' ? (
                <SongList 
                  songs={songs}
                  onEdit={handleEditSong} 
                  onAdd={handleAddSong}
                  onDelete={handleDeleteSong}
                />
              ) : (
                <SongEditor
                  songId={editingSong?._id}
                  onSave={handleSaveSong}
                />
              )}
            </Box>
          </>
        ) : (
          <Login onLoginSuccess={(userData) => {
            setUser(userData);
            loadSongs();
          }} />
        )}
      </Box>
    </ThemeProvider>
  );
}; 