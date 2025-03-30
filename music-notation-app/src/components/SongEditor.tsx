import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  MusicNote as MusicNoteIcon, 
  Save as SaveIcon,
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { songService } from '../services/api';
import { Song, SongSection, SongLine } from '../types/song';

interface SongEditorProps {
  songId?: string;
  onSave?: (song: Song) => void;
}

export const SongEditor: React.FC<SongEditorProps> = ({ songId, onSave }) => {
  const theme = useTheme();
  const [song, setSong] = useState<Song>({
    title: '',
    artist: '',
    album: '',
    notationType: 'carnatic',
    aarohana: '',
    avarohana: '',
    tempo: '',
    timeSignature: '',
    raga: '',
    taal: '',
    sections: [],
    userId: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [editingSection, setEditingSection] = useState<number | null>(null);

  const loadSong = useCallback(async () => {
    if (!songId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await songService.getById(songId);
      setSong(data);
    } catch (err) {
      setError('Error loading song. Please try again.');
      console.error('Error loading song:', err);
    } finally {
      setLoading(false);
    }
  }, [songId]);

  useEffect(() => {
    loadSong();
  }, [loadSong]);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      if (!tokenPayload.userId) {
        throw new Error('Invalid token format');
      }
      return tokenPayload.userId;
    } catch (error) {
      throw new Error('Invalid token');
    }
  };

  const validateSection = (section: SongSection) => {
    if (!section.name.trim()) {
      setError('Section name is required');
      return false;
    }
    if (!section.lines.length) {
      setError('Each section must have at least one line');
      return false;
    }
    for (const line of section.lines) {
      if (!line.notes.trim()) {
        setError('Notes are required for each line');
        return false;
      }
      if (!line.chords.trim()) {
        setError('Chords are required for each line');
        return false;
      }
      if (!line.lyrics.trim()) {
        setError('Lyrics are required for each line');
        return false;
      }
    }
    return true;
  };

  const validateSong = () => {
    if (!song.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!song.artist.trim()) {
      setError('Artist is required');
      return false;
    }
    if (!song.album.trim()) {
      setError('Album is required');
      return false;
    }
    if (!song.notationType) {
      setError('Notation type is required');
      return false;
    }
    if (!song.aarohana.trim()) {
      setError('Aarohana is required');
      return false;
    }
    if (!song.avarohana.trim()) {
      setError('Avarohana is required');
      return false;
    }
    if (!song.tempo.trim()) {
      setError('Tempo is required');
      return false;
    }
    if (!song.timeSignature.trim()) {
      setError('Time signature is required');
      return false;
    }
    if (!song.sections.length) {
      setError('At least one section is required');
      return false;
    }
    for (const section of song.sections) {
      if (!validateSection(section)) {
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateSong()) return;

    try {
      setLoading(true);
      setError(null);
      let savedSong;

      // Get userId from token
      const userId = getUserIdFromToken();
      if (!userId) {
        throw new Error('User ID not found in token');
      }

      // Prepare the song data
      const songData = {
        ...song,
        userId,
        updatedAt: new Date().toISOString(),
      };

      if (songId) {
        savedSong = await songService.update(songId, songData);
      } else {
        savedSong = await songService.create(songData);
      }

      setSong(savedSong);
      setSuccess('Song saved successfully');
      if (onSave) {
        onSave(savedSong);
      }
    } catch (err: any) {
      console.error('Error saving song:', err);
      setError(err.message || 'Error saving song. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSectionSave = async (sectionIndex: number) => {
    if (!validateSection(song.sections[sectionIndex])) return;

    try {
      setLoading(true);
      setError(null);

      // Get userId from token
      const userId = getUserIdFromToken();
      if (!userId) {
        throw new Error('User ID not found in token');
      }

      // Update the section in the song
      const updatedSections = [...song.sections];
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        updatedAt: new Date().toISOString()
      };

      const songData = {
        ...song,
        sections: updatedSections,
        userId,
        updatedAt: new Date().toISOString()
      };

      const savedSong = await songService.update(songId!, songData);
      setSong(savedSong);
      setEditingSection(null);
      setSuccess('Section saved successfully');
    } catch (err: any) {
      console.error('Error saving section:', err);
      setError(err.message || 'Error saving section. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Remove the debounced save since we're handling saves manually
  const handleChange = (field: keyof Song, value: string) => {
    setSong((prev: Song) => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (index: number, field: keyof SongSection, value: string) => {
    setSong((prev: Song) => ({
      ...prev,
      sections: prev.sections.map((section: SongSection, i: number) =>
        i === index ? { ...section, [field]: value } : section
      ),
    }));
  };

  const handleLineChange = (sectionIndex: number, lineIndex: number, field: keyof SongLine, value: string) => {
    setSong((prev: Song) => ({
      ...prev,
      sections: prev.sections.map((section: SongSection, i: number) =>
        i === sectionIndex
          ? {
              ...section,
              lines: section.lines.map((line: SongLine, j: number) =>
                j === lineIndex ? { ...line, [field]: value } : line
              ),
            }
          : section
      ),
    }));
  };

  const addSection = () => {
    const now = new Date().toISOString();
    setSong((prev: Song) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          name: `Section ${prev.sections.length + 1}`,
          order: prev.sections.length,
          lines: [],
          createdAt: now,
          updatedAt: now
        },
      ],
    }));
  };

  const addLine = (sectionIndex: number) => {
    setSong((prev: Song) => ({
      ...prev,
      sections: prev.sections.map((section: SongSection, i: number) =>
        i === sectionIndex
          ? {
              ...section,
              lines: [
                ...section.lines,
                {
                  notes: '',
                  chords: '',
                  lyrics: '',
                  order: section.lines.length,
                },
              ],
            }
          : section
      ),
    }));
  };

  const removeSection = (index: number) => {
    setSong((prev: Song) => ({
      ...prev,
      sections: prev.sections.filter((_: SongSection, i: number) => i !== index),
    }));
  };

  const handleSectionExpand = (sectionIndex: number) => {
    setExpandedSections(prev => 
      prev.includes(sectionIndex) 
        ? prev.filter(i => i !== sectionIndex)
        : [...prev, sectionIndex]
    );
  };

  const handleSectionEdit = (sectionIndex: number) => {
    setEditingSection(sectionIndex);
  };

  if (loading && songId) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header Section - Collapsible */}
      <Accordion 
        defaultExpanded 
        elevation={0} 
        sx={{ 
          mb: 3, 
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
          color: 'white',
          borderRadius: 2,
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          sx={{ 
            '& .MuiAccordionSummary-content': { 
              flexDirection: 'column',
              alignItems: 'flex-start',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box>
              <Typography variant="h4" gutterBottom>
                {songId ? 'Edit Song' : 'Create New Song'}
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                {songId ? 'Modify your existing song' : 'Start creating your new musical masterpiece'}
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              {loading ? 'Saving...' : 'Save Song'}
            </Button>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {/* Basic Information Section */}
            <Grid item xs={12}>
              <Card elevation={0} sx={{ mb: 3, border: `1px solid ${theme.palette.divider}` }}>
                <CardHeader
                  title="Basic Information"
                  avatar={<MusicNoteIcon color="primary" />}
                  sx={{ bgcolor: 'background.default' }}
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="Title"
                        value={song.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        error={!!error && !song.title.trim()}
                        helperText={error && !song.title.trim() ? 'Title is required' : ''}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="Artist"
                        value={song.artist}
                        onChange={(e) => handleChange('artist', e.target.value)}
                        error={!!error && !song.artist.trim()}
                        helperText={error && !song.artist.trim() ? 'Artist is required' : ''}
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
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Musical Details Section */}
            <Grid item xs={12}>
              <Card elevation={0} sx={{ mb: 3, border: `1px solid ${theme.palette.divider}` }}>
                <CardHeader
                  title="Musical Details"
                  avatar={<MusicNoteIcon color="primary" />}
                  sx={{ bgcolor: 'background.default' }}
                />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
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
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Raga"
                        value={song.raga || ''}
                        onChange={(e) => handleChange('raga', e.target.value)}
                        error={!!error && !song.raga?.trim()}
                        helperText={error && !song.raga?.trim() ? 'Raga is required' : ''}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Taal"
                        value={song.taal || ''}
                        onChange={(e) => handleChange('taal', e.target.value)}
                        error={!!error && !song.taal?.trim()}
                        helperText={error && !song.taal?.trim() ? 'Taal is required' : ''}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Song Sections */}
      <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <CardHeader
          title="Song Sections"
          avatar={<MusicNoteIcon color="primary" />}
          action={
            <Button
              startIcon={<AddIcon />}
              onClick={addSection}
              variant="outlined"
              color="primary"
            >
              Add Section
            </Button>
          }
          sx={{ bgcolor: 'background.default' }}
        />
        <Divider />
        <CardContent>
          {song.sections.map((section: SongSection, sectionIndex: number) => (
            <Accordion
              key={sectionIndex}
              expanded={expandedSections.includes(sectionIndex)}
              onChange={() => handleSectionExpand(sectionIndex)}
              sx={{ 
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.background.paper} 30%, ${theme.palette.background.default} 90%)`,
                borderRadius: 2,
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ 
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                  <TextField
                    label="Section Name"
                    value={section.name}
                    onChange={(e) => handleSectionChange(sectionIndex, 'name', e.target.value)}
                    sx={{ width: '300px' }}
                  />
                  <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                    {editingSection === sectionIndex ? (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSectionSave(sectionIndex);
                        }}
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                      >
                        Save
                      </Button>
                    ) : (
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSectionEdit(sectionIndex);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSection(sectionIndex);
                      }}
                      disabled={song.sections.length === 1}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={3}>
                  {section.lines.map((line: SongLine, lineIndex: number) => (
                    <Box key={lineIndex}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={2}
                            label="Notes"
                            value={line.notes}
                            onChange={(e) => handleLineChange(sectionIndex, lineIndex, 'notes', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={2}
                            label="Chords"
                            value={line.chords}
                            onChange={(e) => handleLineChange(sectionIndex, lineIndex, 'chords', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={2}
                            label="Lyrics"
                            value={line.lyrics}
                            onChange={(e) => handleLineChange(sectionIndex, lineIndex, 'lyrics', e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => addLine(sectionIndex)}
                    variant="outlined"
                  >
                    Add Line
                  </Button>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>

      <Snackbar
        open={!!error || !!success}
        autoHideDuration={6000}
        onClose={() => {
          setError(null);
          setSuccess(null);
        }}
      >
        <Alert
          onClose={() => {
            setError(null);
            setSuccess(null);
          }}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {error || success}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 