import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Collapse,
  Paper,
  Typography,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { Song } from '../types/music';

interface SongMetadataProps {
  song: Song;
  onChange: (song: Song) => void;
}

export const SongMetadata: React.FC<SongMetadataProps> = ({ song, onChange }) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = (field: keyof Song, value: string) => {
    onChange({ ...song, [field]: value });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 1,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1,
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Song Details
        </Typography>
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
          }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                value={song.title}
                onChange={(e) => handleChange('title', e.target.value)}
                size="small"
                sx={{ mb: 1 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Artist"
                value={song.artist}
                onChange={(e) => handleChange('artist', e.target.value)}
                size="small"
                sx={{ mb: 1 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Album"
                value={song.album}
                onChange={(e) => handleChange('album', e.target.value)}
                size="small"
                sx={{ mb: 1 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                <InputLabel>Notation Type</InputLabel>
                <Select
                  value={song.notationType}
                  label="Notation Type"
                  onChange={(e) => handleChange('notationType', e.target.value)}
                >
                  <MenuItem value="carnatic">Carnatic</MenuItem>
                  <MenuItem value="western">Western</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Aarohana"
                value={song.aarohana}
                onChange={(e) => handleChange('aarohana', e.target.value)}
                size="small"
                sx={{ mb: 1 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Avarohana"
                value={song.avarohana}
                onChange={(e) => handleChange('avarohana', e.target.value)}
                size="small"
                sx={{ mb: 1 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tempo"
                value={song.tempo}
                onChange={(e) => handleChange('tempo', e.target.value)}
                size="small"
                sx={{ mb: 1 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Time Signature"
                value={song.timeSignature}
                onChange={(e) => handleChange('timeSignature', e.target.value)}
                size="small"
                sx={{ mb: 1 }}
              />
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Paper>
  );
}; 