import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SongMetadata from '../SongMetadata';
import { Song } from '../../types/music';

const mockSong: Song = {
  id: '1',
  title: 'Test Song',
  artist: 'Test Artist',
  album: 'Test Album',
  notationType: 'carnatic',
  aarohana: 'S R G M P D N Ṡ',
  avarohana: 'Ṡ N D P M G R S',
  tempo: 'Adi',
  timeSignature: '4/4',
  sections: [
    {
      name: 'Pallavi',
      lines: [
        {
          notes: 'S R G M',
          chords: 'C Dm Em F',
          lyrics: 'Test lyrics',
        },
      ],
    },
  ],
};

describe('SongMetadata Component', () => {
  const mockOnSongChange = jest.fn();

  beforeEach(() => {
    mockOnSongChange.mockClear();
  });

  it('renders all form fields with correct initial values', () => {
    render(<SongMetadata song={mockSong} onSongChange={mockOnSongChange} />);

    expect(screen.getByLabelText(/title/i)).toHaveValue('Test Song');
    expect(screen.getByLabelText(/artist/i)).toHaveValue('Test Artist');
    expect(screen.getByLabelText(/album/i)).toHaveValue('Test Album');
    expect(screen.getByLabelText(/notation type/i)).toHaveValue('carnatic');
    expect(screen.getByLabelText(/aarohana/i)).toHaveValue('S R G M P D N Ṡ');
    expect(screen.getByLabelText(/avarohana/i)).toHaveValue('Ṡ N D P M G R S');
    expect(screen.getByLabelText(/tempo/i)).toHaveValue('Adi');
    expect(screen.getByLabelText(/time signature/i)).toHaveValue('4/4');
  });

  it('calls onSongChange when title is updated', () => {
    render(<SongMetadata song={mockSong} onSongChange={mockOnSongChange} />);

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'New Title' } });

    expect(mockOnSongChange).toHaveBeenCalledWith({
      ...mockSong,
      title: 'New Title',
    });
  });

  it('calls onSongChange when notation type is changed', () => {
    render(<SongMetadata song={mockSong} onSongChange={mockOnSongChange} />);

    const notationTypeSelect = screen.getByLabelText(/notation type/i);
    fireEvent.change(notationTypeSelect, { target: { value: 'western' } });

    expect(mockOnSongChange).toHaveBeenCalledWith({
      ...mockSong,
      notationType: 'western',
    });
  });

  it('calls onSongChange when tempo is updated', () => {
    render(<SongMetadata song={mockSong} onSongChange={mockOnSongChange} />);

    const tempoInput = screen.getByLabelText(/tempo/i);
    fireEvent.change(tempoInput, { target: { value: 'Rupakam' } });

    expect(mockOnSongChange).toHaveBeenCalledWith({
      ...mockSong,
      tempo: 'Rupakam',
    });
  });
}); 