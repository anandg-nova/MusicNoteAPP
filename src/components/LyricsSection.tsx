import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

interface LyricsSectionProps {
  section: 'pallavi' | 'anupallavi' | 'charanam';
  lyrics: string;
  onChange: (lyrics: string) => void;
}

const LyricsSection: React.FC<LyricsSectionProps> = ({ section, lyrics, onChange }) => {
  const sectionTitle = {
    pallavi: 'Pallavi',
    anupallavi: 'Anupallavi',
    charanam: 'Charanam',
  }[section];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {sectionTitle}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={15}
        value={lyrics}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${sectionTitle.toLowerCase()} lyrics...`}
        variant="outlined"
      />
    </Box>
  );
};

export default LyricsSection; 