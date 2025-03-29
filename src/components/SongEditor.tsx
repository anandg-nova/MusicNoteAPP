import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import MusicNotation from './MusicNotation';
import ChordProgression from './ChordProgression';
import LyricsSection from './LyricsSection';
import SongMetadata from './SongMetadata';

interface SongData {
  title: string;
  artist: string;
  album: string;
  notationType: 'carnatic' | 'western';
  aarohana: string;
  avarohana: string;
  tempo: string;
  timeSignature: string;
  sections: {
    pallavi: string;
    anupallavi: string;
    charanam: string;
  };
  chords: string[];
}

const SongEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [songData, setSongData] = useState<SongData>({
    title: '',
    artist: '',
    album: '',
    notationType: 'western',
    aarohana: '',
    avarohana: '',
    tempo: '120',
    timeSignature: '4/4',
    sections: {
      pallavi: '',
      anupallavi: '',
      charanam: '',
    },
    chords: ['', '', '', ''],
  });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // TODO: Load song data if id exists
    if (id) {
      // Load song data from backend
    }
  }, [id]);

  const handleInputChange = (field: keyof SongData, value: string) => {
    setSongData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (section: keyof SongData['sections'], value: string) => {
    setSongData((prev) => ({
      ...prev,
      sections: { ...prev.sections, [section]: value },
    }));
  };

  const handleChordsChange = (chords: string[]) => {
    setSongData((prev) => ({ ...prev, chords }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving song:', songData);
  };

  const getActiveSection = () => {
    switch (activeTab) {
      case 0:
        return 'pallavi';
      case 1:
        return 'anupallavi';
      case 2:
        return 'charanam';
      default:
        return 'pallavi';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Song' : 'New Song'}
      </Typography>

      <SongMetadata
        title={songData.title}
        artist={songData.artist}
        album={songData.album}
        notationType={songData.notationType}
        aarohana={songData.aarohana}
        avarohana={songData.avarohana}
        tempo={songData.tempo}
        timeSignature={songData.timeSignature}
        onChange={(field, value) => handleInputChange(field as keyof SongData, value)}
      />

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Pallavi" />
        <Tab label="Anupallavi" />
        <Tab label="Charanam" />
      </Tabs>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <MusicNotation
                notationType={songData.notationType}
                notes={[]} // TODO: Add actual notes
                timeSignature={songData.timeSignature}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Chords
            </Typography>
            <Box sx={{ height: 'calc(100% - 40px)' }}>
              <ChordProgression
                chords={songData.chords}
                onChange={handleChordsChange}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <LyricsSection
              section={getActiveSection()}
              lyrics={songData.sections[getActiveSection()]}
              onChange={(value) => handleSectionChange(getActiveSection(), value)}
            />
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Song
        </Button>
      </Box>
    </Box>
  );
};

export default SongEditor; 