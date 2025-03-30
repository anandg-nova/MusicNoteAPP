import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MusicSheet from '../MusicSheet';

describe('MusicSheet Component', () => {
  const mockOnNotesChange = jest.fn();

  beforeEach(() => {
    mockOnNotesChange.mockClear();
  });

  it('renders with initial notes', () => {
    render(
      <MusicSheet
        notes="S R G M"
        onNotesChange={mockOnNotesChange}
      />
    );

    const textField = screen.getByPlaceholderText(/enter notes/i);
    expect(textField).toHaveValue('S R G M');
  });

  it('calls onNotesChange when notes are updated', () => {
    render(
      <MusicSheet
        notes="S R G M"
        onNotesChange={mockOnNotesChange}
      />
    );

    const textField = screen.getByPlaceholderText(/enter notes/i);
    fireEvent.change(textField, { target: { value: 'P D N Ṡ' } });

    expect(mockOnNotesChange).toHaveBeenCalledWith('P D N Ṡ');
  });

  it('renders with empty notes', () => {
    render(
      <MusicSheet
        notes=""
        onNotesChange={mockOnNotesChange}
      />
    );

    const textField = screen.getByPlaceholderText(/enter notes/i);
    expect(textField).toHaveValue('');
  });

  it('handles multiline input', () => {
    render(
      <MusicSheet
        notes="S R G M\nP D N Ṡ"
        onNotesChange={mockOnNotesChange}
      />
    );

    const textField = screen.getByPlaceholderText(/enter notes/i);
    expect(textField).toHaveValue('S R G M\nP D N Ṡ');
  });
}); 