import React, { useEffect, useRef } from 'react';
import { Factory } from 'vexflow';
import { StaveNote, Voice } from 'vexflow';

interface MusicNotationProps {
  notationType: 'carnatic' | 'western';
  notes: string[];
  timeSignature: string;
}

const MusicNotation: React.FC<MusicNotationProps> = ({
  notationType,
  notes,
  timeSignature,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    // Create a new VexFlow factory
    const factory = new Factory({
      renderer: { elementId: containerRef.current.id, width: 500, height: 200 },
    });

    // Create a new score
    const system = factory.System();

    if (notationType === 'western') {
      // Example: Add some western notes
      const staveNotes = [
        new StaveNote({ keys: ['c/4'], duration: 'q' }),
        new StaveNote({ keys: ['d/4'], duration: 'q' }),
        new StaveNote({ keys: ['e/4'], duration: 'q' }),
        new StaveNote({ keys: ['f/4'], duration: 'q' }),
      ];
      system.addStave({
        voices: [new Voice({ numBeats: 4, beatValue: 4 }).addTickables(staveNotes)],
      });
    } else {
      // Example: Add some carnatic notes
      const staveNotes = [
        new StaveNote({ keys: ['c/4'], duration: 'q' }),
        new StaveNote({ keys: ['e/4'], duration: 'q' }),
        new StaveNote({ keys: ['g/4'], duration: 'q' }),
        new StaveNote({ keys: ['c/5'], duration: 'q' }),
      ];
      system.addStave({
        voices: [new Voice({ numBeats: 4, beatValue: 4 }).addTickables(staveNotes)],
      });
    }

    // Format and draw
    system.draw();

    // Store the container reference for cleanup
    const container = containerRef.current;

    // Cleanup function
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [notationType, notes, timeSignature]);

  return <div ref={containerRef} id="music-notation" style={{ width: '100%', height: '200px' }} />;
};

export default MusicNotation; 