import React from 'react';
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { Song } from '../types/song';

interface SongListProps {
  songs: Song[];
  onEdit: (songId: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
}

export const SongList: React.FC<SongListProps> = ({ songs, onEdit, onAdd, onDelete }) => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            My Songs
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAdd}
          >
            Add New Song
          </Button>
        </Box>

        <Paper elevation={2}>
          <List>
            {songs.map((song) => (
              <ListItem key={song._id} divider>
                <ListItemText
                  primary={song.title}
                  secondary={`${song.artist} - ${song.album}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => song._id && onEdit(song._id)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => song._id && onDelete(song._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}; 