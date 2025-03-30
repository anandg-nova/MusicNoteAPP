import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SongEditor from '../SongEditor';
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
    {
      name: 'Anupallavi',
      lines: [
        {
          notes: 'P D N Ṡ',
          chords: 'G F Em Dm',
          lyrics: 'More lyrics',
        },
      ],
    },
  ],
};

describe('SongEditor Component', () => {
  const mockOnBack = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    mockOnBack.mockClear();
    mockOnSave.mockClear();
  });

  it('renders song title and metadata', () => {
    render(
      <SongEditor
        song={mockSong}
        onBack={mockOnBack}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('Test Album')).toBeInTheDocument();
  });

  it('renders all sections', () => {
    render(
      <SongEditor
        song={mockSong}
        onBack={mockOnBack}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByText('Pallavi')).toBeInTheDocument();
    expect(screen.getByText('Anupallavi')).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    render(
      <SongEditor
        song={mockSong}
        onBack={mockOnBack}
        onSave={mockOnSave}
      />
    );

    const backButton = screen.getByTitle(/back to list/i);
    fireEvent.click(backButton);

    expect(mockOnBack).toHaveBeenCalled();
  });

  it('calls onSave when save button is clicked', () => {
    render(
      <SongEditor
        song={mockSong}
        onBack={mockOnBack}
        onSave={mockOnSave}
      />
    );

    const saveButton = screen.getByText(/save changes/i);
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith(mockSong);
  });

  it('shows success message after saving', () => {
    render(
      <SongEditor
        song={mockSong}
        onBack={mockOnBack}
        onSave={mockOnSave}
      />
    );

    const saveButton = screen.getByText(/save changes/i);
    fireEvent.click(saveButton);

    expect(screen.getByText(/changes saved successfully/i)).toBeInTheDocument();
  });

  it('updates section notes when edited', () => {
    render(
      <SongEditor
        song={mockSong}
        onBack={mockOnBack}
        onSave={mockOnSave}
      />
    );

    const pallaviSection = screen.getByText('Pallavi');
    fireEvent.click(pallaviSection);

    const notesField = screen.getByPlaceholderText(/enter notes/i);
    fireEvent.change(notesField, { target: { value: 'New notes' } });

    const saveButton = screen.getByText(/save changes/i);
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith({
      ...mockSong,
      sections: [
        {
          ...mockSong.sections[0],
          lines: [
            {
              ...mockSong.sections[0].lines[0],
              notes: 'New notes',
            },
          ],
        },
        mockSong.sections[1],
      ],
    });
  });
}); 