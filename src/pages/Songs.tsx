import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api } from '../api';
import { Song } from '../types';
import { SongCard } from '../components/SongCard';

export function Songs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await api.getSongs();
        setSongs(response.data);
      } catch (error) {
        toast.error('Failed to load songs');
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Songs</h1>
        <Link to="/songs/new" className="btn">
          <Plus className="w-4 h-4 mr-2" />
          Add Song
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>

      {songs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No songs found. Add one to get started or load the sample data!</p>
        </div>
      )}
    </div>
  );
}