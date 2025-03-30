import React, { useState } from 'react';
import { Box, Typography, Paper, TextField } from '@mui/material';

interface MusicSheetProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

const MusicSheet: React.FC<MusicSheetProps> = ({ notes, onNotesChange }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={0} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Sheet Music
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={2}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Enter notes (e.g., S R G M P D N Ṡ)"
          variant="outlined"
        />
      </Paper>
    </Box>
  );
};

export default MusicSheet; 