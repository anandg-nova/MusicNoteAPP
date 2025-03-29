export interface Note {
  pitch: string;
  duration: string;
  octave: number;
}

export interface CarnaticNote extends Note {
  gamakam?: string;
  swara?: string;
}

export interface WesternNote extends Note {
  accidental?: string;
}

export interface Raga {
  name: string;
  aarohana: string;
  avarohana: string;
  parentScale: string;
  vadi: string;
  samvadi: string;
  pakad: string;
  chalan: string;
  time: string;
  mood: string;
}

export interface Taal {
  name: string;
  beats: number;
  divisions: number[];
  sam: number;
  vibhag: number[];
}

export interface Scale {
  name: string;
  notes: string[];
  type: string;
  root: string;
}

export interface Chord {
  root: string;
  type: string;
  duration: number;
}

export interface Song {
  id?: string;
  title: string;
  artist: string;
  album: string;
  notationType: 'carnatic' | 'western';
  aarohana: string;
  avarohana: string;
  tempo: string;
  timeSignature: string;
  sections: SongSection[];
}

export interface SongSection {
  name: string;
  lines: SongLine[];
}

export interface SongLine {
  notes: string;
  chords: string;
  lyrics: string;
}

export interface MusicNotationProps {
  notes: Note[];
  onChange?: (notes: Note[]) => void;
}

export interface ChordProgressionProps {
  chords: string[];
  onChange: (chords: string[]) => void;
}

export interface LyricsSectionProps {
  section: 'pallavi' | 'anupallavi' | 'charanam';
  lyrics: string;
  onChange: (lyrics: string) => void;
} 