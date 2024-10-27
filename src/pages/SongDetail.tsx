import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Pencil, Trash2, Loader, ArrowLeft, Clock, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { api } from '../api';
import { Song } from '../types';
import { SongForm } from '../components/SongForm';

export function SongDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await api.getSong(Number(id));
        setSong(response.data);
      } catch (error) {
        toast.error('Failed to load song details');
        navigate('/songs');
      } finally {
        setLoading(false);
      }
    };

    fetchSong();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!song) return;
    
    if (window.confirm('Are you sure you want to delete this song?')) {
      try {
        await api.deleteSong(song.id);
        toast.success('Song deleted successfully');
        navigate('/songs');
      } catch (error) {
        toast.error('Failed to delete song');
      }
    }
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!song) return null;

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
        <SongForm
          song={song}
          onSubmit={() => {
            setIsEditing(false);
            // Refresh song data
            api.getSong(song.id).then(response => setSong(response.data));
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/songs"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Songs
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={song.coverUrl}
              alt={song.title}
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{song.title}</h2>
                <Link
                  to={`/artists/${song.artistId}`}
                  className="mt-1 text-lg text-purple-600 hover:text-purple-800"
                >
                  {song.artist?.name}
                </Link>
              </div>
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

            <div className="mt-6 space-y-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                Released in {song.releaseYear}
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                {formatDuration(song.duration)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}