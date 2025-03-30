export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface SongLine {
  notes: string;
  chords: string;
  lyrics: string;
  order: number;
}

export interface SongSection {
  name: string;
  lines: SongLine[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Song {
  _id?: string;
  title: string;
  artist: string;
  album: string;
  notationType: 'western' | 'carnatic' | 'hindustani';
  aarohana: string;
  avarohana: string;
  tempo: string;
  timeSignature: string;
  raga?: string;
  taal?: string;
  sections: SongSection[];
  userId: string;
  createdAt: string;
  updatedAt: string;
} 