import React, { useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import SongEditor from './components/SongEditor';
import { LandingPage } from './components/LandingPage';
import { Song, SongSection } from './types/music';

const App: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([
    {
      id: '1',
      title: 'Endaro Mahanubhavulu',
      artist: 'Tyagaraja',
      album: 'Pancharatna Kritis',
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
              notes: 'S R G M P D N Ṡ  |  Ṡ N D P M G R S',
              chords: 'C  Dm  Em  F   |  G  F  Em Dm C',
              lyrics: 'Endaro Mahanubhavulu Andariki Vandanamulu',
            },
          ],
        },
        {
          name: 'Anupallavi',
          lines: [
            {
              notes: 'P M G R S N, D,  |  S R G M P D',
              chords: 'F  Em Dm C  Bm  |  C  Dm Em F  G',
              lyrics: 'Chandariki Vandanamulu',
            },
          ],
        },
        {
          name: 'Charanam',
          lines: [
            {
              notes: '',
              chords: '',
              lyrics: '',
            },
          ],
        },
      ],
    },
  ]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  const handleSongChange = (updatedSong: Song) => {
    setSongs(prevSongs => 
      prevSongs.map(song => 
        song.id === updatedSong.id ? updatedSong : song
      )
    );
  };

  const handleEditSong = (song: Song) => {
    setSelectedSong(song);
  };

  const handleDeleteSong = (songId: string) => {
    setSongs(prevSongs => prevSongs.filter(song => song.id !== songId));
    if (selectedSong?.id === songId) {
      setSelectedSong(null);
    }
  };

  const handleCreateNewSong = () => {
    const newSong: Song = {
      id: Date.now().toString(),
      title: 'New Song',
      artist: '',
      album: '',
      notationType: 'carnatic',
      aarohana: '',
      avarohana: '',
      tempo: '',
      timeSignature: '4/4',
      sections: [
        {
          name: 'Pallavi',
          lines: [
            {
              notes: '',
              chords: '',
              lyrics: '',
            },
          ],
        },
      ],
    };
    setSongs(prevSongs => [...prevSongs, newSong]);
    setSelectedSong(newSong);
  };

  const handleBack = () => {
    setSelectedSong(null);
  };

  const handleSaveSong = (song: Song) => {
    setSongs(prevSongs => 
      prevSongs.map(s => 
        s.id === song.id ? song : s
      )
    );
    setSelectedSong(song);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {selectedSong ? (
          <SongEditor
            song={selectedSong}
            onBack={handleBack}
            onSave={handleSaveSong}
          />
        ) : (
          <LandingPage
            songs={songs}
            onEditSong={handleEditSong}
            onDeleteSong={handleDeleteSong}
            onCreateNewSong={handleCreateNewSong}
          />
        )}
      </Container>
    </>
  );
};

export default App; 