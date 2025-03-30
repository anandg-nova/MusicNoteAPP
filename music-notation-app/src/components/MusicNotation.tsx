import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Factory, StaveNote, Formatter } from 'vexflow';
import { Note } from '../types/music';

interface MusicNotationProps {
  notes: Note[];
  onChange?: (notes: Note[]) => void;
}

const MusicNotation: React.FC<MusicNotationProps> = ({
  notes,
  onChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const vf = new Factory({
      renderer: { elementId: 'music-notation', width: 800, height: 200 },
    });

    const context = vf.getContext();
    const stave = vf.Stave({ x: 10, y: 40, width: 780 });

    // Add treble clef and time signature
    stave.addClef('treble');
    stave.addTimeSignature('4/4');

    // Convert our notes to VexFlow notes
    const vexflowNotes = notes.map(note => 
      new StaveNote({ 
        keys: [`${note.pitch}/${note.octave}`], 
        duration: note.duration.toString() 
      })
    );

    // If no notes, add some placeholder notes
    if (vexflowNotes.length === 0) {
      vexflowNotes.push(
        new StaveNote({ keys: ['c/4'], duration: 'q' }),
        new StaveNote({ keys: ['d/4'], duration: 'q' }),
        new StaveNote({ keys: ['e/4'], duration: 'q' }),
        new StaveNote({ keys: ['f/4'], duration: 'q' })
      );
    }

    // Format and draw the notes
    Formatter.FormatAndDraw(context, stave, vexflowNotes);

    // Draw the stave
    stave.setContext(context).draw();

    // Cleanup
    return () => {
      context.clear();
    };
  }, [notes]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div id="music-notation" />
    </Box>
  );
};

export default MusicNotation; 