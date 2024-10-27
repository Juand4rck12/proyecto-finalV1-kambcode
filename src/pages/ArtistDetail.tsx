import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Pencil, Trash2, Loader, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api } from '../api';
import { Artist, Song } from '../types';
import { SongCard } from '../components/SongCard';
import { ArtistForm } from '../components/ArtistForm';

export function ArtistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistResponse, songsResponse] = await Promise.all([
          api.getArtist(Number(id)),
          api.getArtistSongs(Number(id))
        ]);
        setArtist(artistResponse.data);
        setSongs(songsResponse.data);
      } catch (error) {
        toast.error('Failed to load artist details');
        navigate('/artists');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!artist) return;
    
    if (window.confirm('Are you sure you want to delete this artist?')) {
      try {
        await api.deleteArtist(artist.id);
        toast.success('Artist deleted successfully');
        navigate('/artists');
      } catch (error) {
        toast.error('Failed to delete artist');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!artist) return null;

  if (isEditing) {
    return (
      <div>
        <div className="mb-6">
          <button
            onClick={() => setIsEditing(false)}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Details
          </button>
        </div>
        <ArtistForm
          artist={artist}
          onSubmit={() => {
            setIsEditing(false);
            // Refresh artist data
            api.getArtist(artist.id).then(response => setArtist(response.data));
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/artists"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Artists
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={artist.photoUrl}
              alt={artist.name}
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-900">{artist.name}</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-400 hover:text-purple-600"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="mt-4 text-gray-600 whitespace-pre-line">{artist.bio}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Songs</h3>
          <Link to="/songs/new" className="btn">
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
            <p className="text-gray-500">No songs found for this artist.</p>
          </div>
        )}
      </div>
    </div>
  );
}