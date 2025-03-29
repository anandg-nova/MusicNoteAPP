import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Button,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  MusicNote as MusicNoteIcon,
} from '@mui/icons-material';
import { Song } from '../types/music';

interface LandingPageProps {
  songs: Song[];
  onEditSong: (song: Song) => void;
  onDeleteSong: (songId: string) => void;
  onCreateNewSong: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  songs,
  onEditSong,
  onDeleteSong,
  onCreateNewSong,
}) => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <MusicNoteIcon sx={{ fontSize: 40, color: '#1976d2' }} />
              <Typography variant="h4" component="h1">
                Music Sheets
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onCreateNewSong}
              sx={{
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#1565c0' }
              }}
            >
              Create New Sheet
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.8)', 
              borderRadius: 2,
              border: '1px solid #dee2e6'
            }}
          >
            <List>
              {songs.map((song) => (
                <ListItem
                  key={song.id}
                  divider
                  sx={{
                    '&:last-child': { borderBottom: 'none' },
                    '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.02)' }
                  }}
                >
                  <ListItemText
                    primary={song.title}
                    secondary={`${song.artist} • ${song.notationType} • ${song.tempo}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => onEditSong(song)}
                      sx={{ 
                        mr: 1,
                        color: '#1976d2',
                        '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.1)' }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => song.id && onDeleteSong(song.id)}
                      sx={{ 
                        color: '#d32f2f',
                        '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.1)' }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}; 