import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { Factory, StaveNote, Formatter } from 'vexflow';
import { Note } from '../types/music';

interface MusicSheetProps {
  notes: Note[];
  onChange?: (notes: Note[]) => void;
}

const MusicSheet: React.FC<MusicSheetProps> = ({ notes, onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vf, setVf] = useState<Factory | null>(null);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const factory = new Factory({
      renderer: { elementId: 'music-sheet', width: 800, height: 200 },
    });

    setVf(factory);
    setContext(factory.getContext());

    return () => {
      factory.getContext().clear();
    };
  }, []);

  useEffect(() => {
    if (!context || !vf) return;

    // Clear previous content
    context.clear();

    // Create a new stave
    const stave = vf.Stave({ x: 10, y: 40, width: 780 });

    // Add clef and time signature
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

    // Add lyrics if available
    if (notes.length > 0) {
      context.addLyrics(vexflowNotes, vexflowNotes.map((_, i: number) => `Lyric ${i + 1}`));
    }

    // Add tempo marking
    context.save();
    context.setFont('Arial', 12);
    context.fillText('Tempo: 120', 10, 20);
    context.restore();
  }, [context, vf, notes]);

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
      <div id="music-sheet" />
    </Box>
  );
};

export default MusicSheet; 