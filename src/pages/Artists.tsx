import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api } from '../api';
import { Artist } from '../types';
import { ArtistCard } from '../components/ArtistCard';

export function Artists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.getArtists();
        setArtists(response.data);
      } catch (error) {
        toast.error('Failed to load artists');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
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
        <h1 className="text-2xl font-bold text-gray-900">Artists</h1>
        <Link to="/artists/new" className="btn">
          <Plus className="w-4 h-4 mr-2" />
          Add Artist
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>

      {artists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No artists found. Add one to get started or load the sample data!</p>
        </div>
      )}
    </div>
  );
}