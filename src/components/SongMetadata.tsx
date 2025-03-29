import React from 'react';
import {
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

interface SongMetadataProps {
  title: string;
  artist: string;
  album: string;
  notationType: 'carnatic' | 'western';
  aarohana: string;
  avarohana: string;
  tempo: string;
  timeSignature: string;
  onChange: (field: string, value: string) => void;
}

const SongMetadata: React.FC<SongMetadataProps> = ({
  title,
  artist,
  album,
  notationType,
  aarohana,
  avarohana,
  tempo,
  timeSignature,
  onChange,
}) => {
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Song Title"
            value={title}
            onChange={(e) => onChange('title', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Artist"
            value={artist}
            onChange={(e) => onChange('artist', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Album"
            value={album}
            onChange={(e) => onChange('album', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Notation Type</InputLabel>
            <Select
              value={notationType}
              label="Notation Type"
              onChange={(e) => onChange('notationType', e.target.value)}
            >
              <MenuItem value="western">Western</MenuItem>
              <MenuItem value="carnatic">Carnatic</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Aarohana"
            value={aarohana}
            onChange={(e) => onChange('aarohana', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Avarohana"
            value={avarohana}
            onChange={(e) => onChange('avarohana', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tempo"
            value={tempo}
            onChange={(e) => onChange('tempo', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Time Signature"
            value={timeSignature}
            onChange={(e) => onChange('timeSignature', e.target.value)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SongMetadata; 