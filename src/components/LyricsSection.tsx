import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

interface LyricsSectionProps {
  section: 'pallavi' | 'anupallavi' | 'charanam';
  lyrics: string;
  onChange: (lyrics: string) => void;
}

const LyricsSection: React.FC<LyricsSectionProps> = ({
  section,
  lyrics,
  onChange,
}) => {
  const getSectionTitle = () => {
    switch (section) {
      case 'pallavi':
        return 'Pallavi (First Section)';
      case 'anupallavi':
        return 'Anupallavi (Second Section)';
      case 'charanam':
        return 'Charanam (Final Section)';
      default:
        return 'Lyrics';
    }
  };

  const getSectionDescription = () => {
    switch (section) {
      case 'pallavi':
        return 'The main theme or chorus of the song. In Carnatic music, this is the first section that introduces the raga and theme.';
      case 'anupallavi':
        return 'The second section that develops the theme further. It usually has a different melody but maintains the same raga.';
      case 'charanam':
        return 'The final section that concludes the song. It often returns to the pallavi melody at the end.';
      default:
        return 'Enter the lyrics for this section.';
    }
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          mb: 1,
          fontWeight: 600,
          color: 'primary.main',
        }}
      >
        {getSectionTitle()}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        {getSectionDescription()}
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: 'background.default',
              borderRadius: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value="english"
                    label="Language"
                    onChange={() => {}}
                  >
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="sanskrit">Sanskrit</MenuItem>
                    <MenuItem value="tamil">Tamil</MenuItem>
                    <MenuItem value="telugu">Telugu</MenuItem>
                    <MenuItem value="kannada">Kannada</MenuItem>
                    <MenuItem value="malayalam">Malayalam</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Script</InputLabel>
                  <Select
                    value="roman"
                    label="Script"
                    onChange={() => {}}
                  >
                    <MenuItem value="roman">Roman</MenuItem>
                    <MenuItem value="devanagari">Devanagari</MenuItem>
                    <MenuItem value="tamil">Tamil</MenuItem>
                    <MenuItem value="telugu">Telugu</MenuItem>
                    <MenuItem value="kannada">Kannada</MenuItem>
                    <MenuItem value="malayalam">Malayalam</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Transliteration</InputLabel>
                  <Select
                    value="itrans"
                    label="Transliteration"
                    onChange={() => {}}
                  >
                    <MenuItem value="itrans">ITRANS</MenuItem>
                    <MenuItem value="iast">IAST</MenuItem>
                    <MenuItem value="slp1">SLP1</MenuItem>
                    <MenuItem value="hk">Harvard-Kyoto</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  value={lyrics}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="Enter lyrics here..."
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LyricsSection; 