import React from 'react';
import { Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface ChordProgressionProps {
  chords: string[];
  onChange: (chords: string[]) => void;
}

const commonChords = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
  'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'A#m', 'Bm',
  'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7',
];

const ChordProgression: React.FC<ChordProgressionProps> = ({ chords, onChange }) => {
  const handleChordChange = (index: number, value: string) => {
    const newChords = [...chords];
    newChords[index] = value;
    onChange(newChords);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {chords.map((chord, index) => (
        <FormControl key={index} size="small">
          <Select
            value={chord}
            onChange={(e) => handleChordChange(index, e.target.value)}
            displayEmpty
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            {commonChords.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Box>
  );
};

export default ChordProgression; 