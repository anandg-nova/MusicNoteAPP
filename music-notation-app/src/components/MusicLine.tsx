import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

interface MusicLineProps {
  lineNumber: number;
  notes: string;
  chords: string;
  lyrics: string;
  isEditable: boolean;
  onNotesChange: (value: string) => void;
  onChordsChange: (value: string) => void;
  onLyricsChange: (value: string) => void;
  onDelete: () => void;
}

export const MusicLine: React.FC<MusicLineProps> = ({
  lineNumber,
  notes,
  chords,
  lyrics,
  isEditable,
  onNotesChange,
  onChordsChange,
  onLyricsChange,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(notes);
  const [editedChords, setEditedChords] = useState(chords);
  const [editedLyrics, setEditedLyrics] = useState(lyrics);

  const handleSave = () => {
    onNotesChange(editedNotes);
    onChordsChange(editedChords);
    onLyricsChange(editedLyrics);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedNotes(notes);
    setEditedChords(chords);
    setEditedLyrics(lyrics);
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
        p: 1,
        bgcolor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 1,
        position: 'relative',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.8)',
        },
      }}
    >
      {isEditing ? (
        <>
          <TextField
            size="small"
            label="Notes"
            value={editedNotes}
            onChange={(e) => setEditedNotes(e.target.value)}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                fontFamily: 'monospace',
              },
            }}
          />
          <TextField
            size="small"
            label="Chords"
            value={editedChords}
            onChange={(e) => setEditedChords(e.target.value)}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                fontFamily: 'monospace',
              },
            }}
          />
          <TextField
            size="small"
            label="Lyrics"
            value={editedLyrics}
            onChange={(e) => setEditedLyrics(e.target.value)}
            fullWidth
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5, mt: 0.5 }}>
            <Tooltip title="Cancel">
              <IconButton
                size="small"
                onClick={handleCancel}
                sx={{
                  color: '#d32f2f',
                  '&:hover': {
                    bgcolor: 'rgba(211, 47, 47, 0.1)',
                  },
                }}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save Changes">
              <IconButton
                size="small"
                onClick={handleSave}
                sx={{
                  color: '#2e7d32',
                  '&:hover': {
                    bgcolor: 'rgba(46, 125, 50, 0.1)',
                  },
                }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: '#666',
                minWidth: '2rem',
                fontFamily: 'monospace',
              }}
            >
              {lineNumber}.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                fontFamily: 'monospace',
                color: '#1976d2',
              }}
            >
              {notes}
            </Typography>
            {isEditable && (
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Tooltip title="Edit Line">
                  <IconButton
                    size="small"
                    onClick={() => setIsEditing(true)}
                    sx={{
                      color: '#1976d2',
                      '&:hover': {
                        bgcolor: 'rgba(25, 118, 210, 0.1)',
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Line">
                  <IconButton
                    size="small"
                    onClick={onDelete}
                    sx={{
                      color: '#d32f2f',
                      '&:hover': {
                        bgcolor: 'rgba(211, 47, 47, 0.1)',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                minWidth: '2rem',
                fontFamily: 'monospace',
                color: '#666',
              }}
            />
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                fontFamily: 'monospace',
                color: '#9c27b0',
              }}
            >
              {chords}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                minWidth: '2rem',
                color: '#666',
              }}
            />
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                color: '#333',
              }}
            >
              {lyrics}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
}; 