import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Button,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { Song, SongSection } from '../types/music';
import SongMetadata from './SongMetadata';
import SectionHeader from './SectionHeader';
import MusicSheet from './MusicSheet';

interface SongEditorProps {
  song: Song;
  onBack: () => void;
  onSave: (song: Song) => void;
}

const SongEditor: React.FC<SongEditorProps> = ({ song: initialSong, onBack, onSave }) => {
  const [song, setSong] = useState<Song>(initialSong);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>(
    initialSong.sections.reduce((acc, section) => ({ ...acc, [section.name]: true }), {})
  );

  useEffect(() => {
    setSong(initialSong);
    setExpandedSections(
      initialSong.sections.reduce((acc, section) => ({ ...acc, [section.name]: true }), {})
    );
  }, [initialSong]);

  const handleSongChange = (updatedSong: Song) => {
    setSong(updatedSong);
  };

  const handleSectionChange = (sectionName: string, updatedSection: SongSection) => {
    setSong(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.name === sectionName ? updatedSection : section
      )
    }));
  };

  const handleSave = () => {
    onSave(song);
    setShowSaveSuccess(true);
  };

  const handleToggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Tooltip title="Back to List">
            <IconButton onClick={onBack} sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            {song.title || 'Untitled Song'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>

        <SongMetadata song={song} onSongChange={handleSongChange} />

        {song.sections.map((section) => (
          <Box key={section.name} sx={{ mt: 3 }}>
            <SectionHeader
              title={section.name}
              onEdit={() => {}}
              onDelete={() => {}}
              onAdd={() => {}}
              onToggleExpand={() => handleToggleSection(section.name)}
              isExpanded={expandedSections[section.name]}
            />
            {expandedSections[section.name] && (
              <Box sx={{ mt: 2 }}>
                {section.lines.map((line, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <MusicSheet
                      notes={line.notes}
                      onNotesChange={(notes) => {
                        const updatedLines = [...section.lines];
                        updatedLines[index] = { ...line, notes };
                        handleSectionChange(section.name, { ...section, lines: updatedLines });
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        ))}

        <Snackbar
          open={showSaveSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSaveSuccess(false)}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Changes saved successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default SongEditor; 