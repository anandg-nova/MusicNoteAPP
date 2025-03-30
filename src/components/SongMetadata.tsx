import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
} from '@mui/material';
import { Song } from '../types/music';

interface SongMetadataProps {
  song: Song;
  onSongChange: (song: Song) => void;
}

const SongMetadata: React.FC<SongMetadataProps> = ({ song, onSongChange }) => {
  const handleChange = (field: keyof Song, value: string) => {
    onSongChange({ ...song, [field]: value });
  };

  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <h3 style={{ margin: 0 }}>Song Details</h3>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              value={song.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Artist"
              value={song.artist}
              onChange={(e) => handleChange('artist', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Album"
              value={song.album}
              onChange={(e) => handleChange('album', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Notation Type</InputLabel>
              <Select
                value={song.notationType}
                label="Notation Type"
                onChange={(e) => handleChange('notationType', e.target.value)}
              >
                <MenuItem value="western">Western</MenuItem>
                <MenuItem value="carnatic">Carnatic</MenuItem>
                <MenuItem value="hindustani">Hindustani</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Aarohana"
              value={song.aarohana}
              onChange={(e) => handleChange('aarohana', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Avarohana"
              value={song.avarohana}
              onChange={(e) => handleChange('avarohana', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tempo"
              value={song.tempo}
              onChange={(e) => handleChange('tempo', e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Time Signature"
              value={song.timeSignature}
              onChange={(e) => handleChange('timeSignature', e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SongMetadata; 