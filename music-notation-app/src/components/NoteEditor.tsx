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
import { Note } from '../types/music';

interface NoteEditorProps {
  notes: Note[];
  onChange: (notes: Note[]) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  notes,
  onChange,
}) => {
  const [newNote, setNewNote] = useState<Partial<Note>>({
    pitch: '',
    duration: 'q', // quarter note by default
    octave: 4, // default octave
  });

  const handleAddNote = () => {
    if (!newNote.pitch) return;

    const note: Note = {
      pitch: newNote.pitch,
      duration: newNote.duration || 'q',
      octave: newNote.octave || 4,
    };

    onChange([...notes, note]);
    setNewNote({
      pitch: '',
      duration: 'q',
      octave: 4,
    });
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    onChange(updatedNotes);
  };

  const handleNoteChange = (index: number, field: keyof Note, value: string | number) => {
    const updatedNotes = notes.map((note, i) => {
      if (i === index) {
        return { ...note, [field]: value };
      }
      return note;
    });
    onChange(updatedNotes);
  };

  const getPitchOptions = () => {
    return ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  };

  const getDurationOptions = () => {
    return [
      { value: 'w', label: 'Whole' },
      { value: 'h', label: 'Half' },
      { value: 'q', label: 'Quarter' },
      { value: '8', label: 'Eighth' },
      { value: '16', label: 'Sixteenth' },
      { value: '32', label: 'Thirty-second' },
    ];
  };

  const getOctaveOptions = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8];
  };

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
        Note Editor
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid xs={12} md={3}>
          <Select
            fullWidth
            value={newNote.pitch}
            onChange={(e) => setNewNote({ ...newNote, pitch: e.target.value })}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Pitch
            </MenuItem>
            {getPitchOptions().map((pitch) => (
              <MenuItem key={pitch} value={pitch}>
                {pitch}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid xs={12} md={3}>
          <Select
            fullWidth
            value={newNote.duration}
            onChange={(e) => setNewNote({ ...newNote, duration: e.target.value })}
          >
            {getDurationOptions().map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid xs={12} md={3}>
          <Select
            fullWidth
            value={newNote.octave}
            onChange={(e) => setNewNote({ ...newNote, octave: Number(e.target.value) })}
          >
            {getOctaveOptions().map((octave) => (
              <MenuItem key={octave} value={octave}>
                Octave {octave}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid xs={12} md={3}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddNote}
            disabled={!newNote.pitch}
            sx={{ height: '100%' }}
          >
            Add Note
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Notes
        </Typography>
        {notes.map((note, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
            <Grid xs={12} md={3}>
              <Select
                fullWidth
                value={note.pitch}
                onChange={(e) => handleNoteChange(index, 'pitch', e.target.value)}
              >
                {getPitchOptions().map((pitch) => (
                  <MenuItem key={pitch} value={pitch}>
                    {pitch}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid xs={12} md={3}>
              <Select
                fullWidth
                value={note.duration}
                onChange={(e) => handleNoteChange(index, 'duration', e.target.value)}
              >
                {getDurationOptions().map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid xs={12} md={3}>
              <Select
                fullWidth
                value={note.octave}
                onChange={(e) => handleNoteChange(index, 'octave', Number(e.target.value))}
              >
                {getOctaveOptions().map((octave) => (
                  <MenuItem key={octave} value={octave}>
                    Octave {octave}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid xs={12} md={3}>
              <IconButton
                color="error"
                onClick={() => handleDeleteNote(index)}
                sx={{ mt: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Paper>
  );
};

export default NoteEditor; 