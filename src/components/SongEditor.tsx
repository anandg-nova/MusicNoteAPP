import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
  useMediaQuery,
  Collapse,
} from '@mui/material';
import {
  Add as AddIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { Song, SongSection } from '../types/music';
import { SongMetadata } from './SongMetadata';
import { MusicLine } from './MusicLine';
import { SectionHeader } from './SectionHeader';

interface SongEditorProps {
  song: Song;
  onChange: (song: Song) => void;
  onBack?: () => void;
}

export const SongEditor: React.FC<SongEditorProps> = ({ song, onChange, onBack }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sections, setSections] = useState<SongSection[]>(song.sections);
  const [isEditing, setIsEditing] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [isNewSectionDialogOpen, setIsNewSectionDialogOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<boolean[]>(sections.map(() => true));

  const handleLineChange = (sectionIndex: number, lineIndex: number, field: 'notes' | 'chords' | 'lyrics', value: string) => {
    const newSections = [...sections];
    newSections[sectionIndex].lines[lineIndex][field] = value;
    setSections(newSections);
    onChange({ ...song, sections: newSections });
  };

  const handleAddLine = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].lines.push({
      notes: '',
      chords: '',
      lyrics: '',
    });
    setSections(newSections);
    onChange({ ...song, sections: newSections });
  };

  const handleDeleteLine = (sectionIndex: number, lineIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].lines.splice(lineIndex, 1);
    setSections(newSections);
    onChange({ ...song, sections: newSections });
  };

  const handleAddSection = () => {
    setIsNewSectionDialogOpen(true);
  };

  const handleConfirmNewSection = () => {
    if (newSectionName.trim()) {
      const newSection: SongSection = {
        name: newSectionName.trim(),
        lines: [],
      };
      const newSections = [...sections, newSection];
      setSections(newSections);
      onChange({ ...song, sections: newSections });
      setNewSectionName('');
      setIsNewSectionDialogOpen(false);
    }
  };

  const handleDeleteSection = (sectionIndex: number) => {
    const newSections = sections.filter((_, index) => index !== sectionIndex);
    setSections(newSections);
    onChange({ ...song, sections: newSections });
  };

  const handleToggleSection = (sectionIndex: number) => {
    const newExpandedSections = [...expandedSections];
    newExpandedSections[sectionIndex] = !newExpandedSections[sectionIndex];
    setExpandedSections(newExpandedSections);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/music-sheet-bg.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        py: { xs: 1, sm: 2 },
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: '100%', sm: 1200 },
          mx: 'auto',
          px: { xs: 1, sm: 2 },
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton 
            onClick={onBack}
            sx={{ 
              mr: 2,
              color: '#1976d2',
              '&:hover': { bgcolor: 'rgba(25, 118, 210, 0.1)' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h2">
            {song.title || 'Untitled Song'}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SongMetadata song={song} onChange={onChange} />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {sections.map((section, sectionIndex) => (
                <Paper
                  key={sectionIndex}
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
                  <SectionHeader
                    title={section.name}
                    isEditing={isEditing}
                    onEdit={() => setIsEditing(!isEditing)}
                    onDelete={() => handleDeleteSection(sectionIndex)}
                    onAdd={() => handleAddLine(sectionIndex)}
                    expanded={expandedSections[sectionIndex]}
                    onToggleExpand={() => handleToggleSection(sectionIndex)}
                  />

                  <Collapse in={expandedSections[sectionIndex]}>
                    <Box sx={{ p: 1.5 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {section.lines.map((line, lineIndex) => (
                          <MusicLine
                            key={lineIndex}
                            lineNumber={lineIndex + 1}
                            notes={line.notes}
                            chords={line.chords}
                            lyrics={line.lyrics}
                            isEditable={isEditing}
                            onNotesChange={(value) => handleLineChange(sectionIndex, lineIndex, 'notes', value)}
                            onChordsChange={(value) => handleLineChange(sectionIndex, lineIndex, 'chords', value)}
                            onLyricsChange={(value) => handleLineChange(sectionIndex, lineIndex, 'lyrics', value)}
                            onDelete={() => handleDeleteLine(sectionIndex, lineIndex)}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Collapse>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={isNewSectionDialogOpen}
        onClose={() => setIsNewSectionDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Add New Section</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Section Name"
            fullWidth
            size="small"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsNewSectionDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmNewSection} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 