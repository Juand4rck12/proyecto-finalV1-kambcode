import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Artists } from './pages/Artists';
import { Songs } from './pages/Songs';
import { ArtistDetail } from './pages/ArtistDetail';
import { SongDetail } from './pages/SongDetail';
import { ArtistForm } from './components/ArtistForm';
import { SongForm } from './components/SongForm';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="artists" element={<Artists />} />
          <Route path="artists/new" element={<ArtistForm />} />
          <Route path="artists/:id" element={<ArtistDetail />} />
          <Route path="songs" element={<Songs />} />
          <Route path="songs/new" element={<SongForm />} />
          <Route path="songs/:id" element={<SongDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;