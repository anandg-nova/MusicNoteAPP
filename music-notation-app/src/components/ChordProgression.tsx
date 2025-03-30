import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Select,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface ChordProgressionProps {
  chords: string[];
  onChange: (chords: string[]) => void;
}

const ChordProgression: React.FC<ChordProgressionProps> = ({
  chords,
  onChange,
}) => {
  const [newChord, setNewChord] = useState('');

  const handleAddChord = () => {
    if (!newChord) return;
    onChange([...chords, newChord]);
    setNewChord('');
  };

  const handleDeleteChord = (index: number) => {
    const updatedChords = chords.filter((_, i) => i !== index);
    onChange(updatedChords);
  };

  const handleChordChange = (index: number, value: string) => {
    const updatedChords = chords.map((chord, i) => {
      if (i === index) {
        return value;
      }
      return chord;
    });
    onChange(updatedChords);
  };

  const getWesternChordOptions = () => {
    const roots = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const qualities = ['', 'm', '7', 'm7', 'maj7', 'dim', 'aug', 'sus2', 'sus4'];
    const options: string[] = [];

    roots.forEach((root) => {
      qualities.forEach((quality) => {
        options.push(`${root}${quality}`);
      });
    });

    return options;
  };

  const getCarnaticChordOptions = () => {
    return [
      'S',
      'R1',
      'R2',
      'G2',
      'G3',
      'M1',
      'M2',
      'P',
      'D1',
      'D2',
      'N2',
      'N3',
      'S',
    ];
  };

  const chordOptions = getWesternChordOptions();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: 'background.default',
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: 'primary.main',
        }}
      >
        Chord Progression
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid xs={12} md={11}>
          <Select
            fullWidth
            value={newChord}
            onChange={(e) => setNewChord(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Chord
            </MenuItem>
            {chordOptions.map((chord) => (
              <MenuItem key={chord} value={chord}>
                {chord}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid xs={12} md={1}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddChord}
            disabled={!newChord}
            sx={{ height: '100%' }}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Chords
        </Typography>
        <Grid container spacing={2}>
          {chords.map((chord, index) => (
            <Grid xs={12} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Select
                  value={chord}
                  onChange={(e) => handleChordChange(index, e.target.value)}
                  size="small"
                  sx={{ flex: 1 }}
                >
                  {chordOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteChord(index)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default ChordProgression; 