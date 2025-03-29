import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  notationType: 'carnatic' | 'western';
}

const SongList: React.FC = () => {
  const navigate = useNavigate();
  // TODO: Replace with actual data from backend
  const songs: Song[] = [
    {
      id: '1',
      title: 'Sample Song',
      artist: 'Sample Artist',
      album: 'Sample Album',
      notationType: 'western',
    },
  ];

  const handleEdit = (id: string) => {
    navigate(`/editor/${id}`);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log('Delete song:', id);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Songs
      </Typography>
      <Paper elevation={2}>
        <List>
          {songs.map((song) => (
            <ListItem key={song.id} divider>
              <ListItemText
                primary={song.title}
                secondary={`${song.artist} - ${song.album} (${song.notationType})`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(song.id)}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDelete(song.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default SongList; 