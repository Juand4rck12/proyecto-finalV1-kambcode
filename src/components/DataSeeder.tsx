import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { api } from '../api';

const initialArtists = [
  {
    name: 'The Beatles',
    bio: 'The Beatles were an English rock band formed in Liverpool.',
    photoUrl: 'https://picsum.photos/id/1015/400/400'
  },
  {
    name: 'Adele',
    bio: 'Adele is an English singer-songwriter known for her soulful voice.',
    photoUrl: 'https://picsum.photos/id/1016/400/400'
  }
];

const initialSongs = [
  {
    title: 'Hey Jude',
    releaseYear: 1968,
    duration: 431,
    coverUrl: 'https://picsum.photos/id/1018/400/400'
  },
  {
    title: 'Let It Be',
    releaseYear: 1970,
    duration: 243,
    coverUrl: 'https://picsum.photos/id/1020/400/400'
  },
  {
    title: 'Rolling in the Deep',
    releaseYear: 2010,
    duration: 228,
    coverUrl: 'https://picsum.photos/id/1021/400/400'
  },
  {
    title: 'Someone Like You',
    releaseYear: 2011,
    duration: 284,
    coverUrl: 'https://picsum.photos/id/1022/400/400'
  },
  {
    title: 'Hello',
    releaseYear: 2015,
    duration: 295,
    coverUrl: 'https://picsum.photos/id/1023/400/400'
  }
];

export function DataSeeder() {
  const [seeding, setSeeding] = useState(false);

  const seedData = async () => {
    if (seeding) return;
    setSeeding(true);

    try {
      // Create artists first
      const artistResponses = await Promise.all(
        initialArtists.map(artist => api.createArtist(artist))
      );

      const artists = artistResponses.map(response => response.data);
      
      // Create songs with correct artist IDs
      const songsWithArtists = [
        { ...initialSongs[0], artistId: artists[0].id }, // Hey Jude - Beatles
        { ...initialSongs[1], artistId: artists[0].id }, // Let It Be - Beatles
        { ...initialSongs[2], artistId: artists[1].id }, // Rolling in the Deep - Adele
        { ...initialSongs[3], artistId: artists[1].id }, // Someone Like You - Adele
        { ...initialSongs[4], artistId: artists[1].id }, // Hello - Adele
      ];

      await Promise.all(
        songsWithArtists.map(song => api.createSong(song))
      );

      toast.success('Sample data added successfully!');
    } catch (error) {
      toast.error('Failed to add sample data');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="text-center py-12">
      <button
        onClick={seedData}
        disabled={seeding}
        className="btn"
      >
        {seeding ? 'Adding Sample Data...' : 'Add Sample Data'}
      </button>
    </div>
  );
}