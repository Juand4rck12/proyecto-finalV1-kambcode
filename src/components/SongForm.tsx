import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Artist, Song } from '../types';
import { api } from '../api';

interface SongFormProps {
  song?: Song;
  onSubmit?: () => void;
}

export function SongForm({ song, onSubmit }: SongFormProps) {
  const navigate = useNavigate();
  const [artists, setArtists] = useState<Artist[]>([]);
  const isEditing = !!song;

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.getArtists();
        setArtists(response.data);
      } catch (error) {
        toast.error('Failed to load artists');
      }
    };

    fetchArtists();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const songData = {
      title: formData.get('title') as string,
      artistId: parseInt(formData.get('artistId') as string),
      releaseYear: parseInt(formData.get('releaseYear') as string),
      duration: parseInt(formData.get('duration') as string),
      coverUrl: formData.get('coverUrl') as string,
    };

    try {
      if (isEditing && song) {
        await api.updateSong(song.id, songData);
        toast.success('Song updated successfully');
      } else {
        await api.createSong(songData);
        toast.success('Song created successfully');
      }
      onSubmit?.();
      navigate('/songs');
    } catch (error) {
      toast.error(isEditing ? 'Failed to update song' : 'Failed to create song');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          defaultValue={song?.title}
          className="input mt-1"
        />
      </div>

      <div>
        <label htmlFor="artistId" className="block text-sm font-medium text-gray-700">
          Artist
        </label>
        <select
          name="artistId"
          id="artistId"
          required
          defaultValue={song?.artistId}
          className="input mt-1"
        >
          <option value="">Select an artist</option>
          {artists.map((artist) => (
            <option key={artist.id} value={artist.id}>
              {artist.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">
            Release Year
          </label>
          <input
            type="number"
            name="releaseYear"
            id="releaseYear"
            required
            min="1900"
            max={new Date().getFullYear()}
            defaultValue={song?.releaseYear}
            className="input mt-1"
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration (seconds)
          </label>
          <input
            type="number"
            name="duration"
            id="duration"
            required
            min="1"
            defaultValue={song?.duration}
            className="input mt-1"
          />
        </div>
      </div>

      <div>
        <label htmlFor="coverUrl" className="block text-sm font-medium text-gray-700">
          Cover URL
        </label>
        <input
          type="url"
          name="coverUrl"
          id="coverUrl"
          required
          defaultValue={song?.coverUrl}
          className="input mt-1"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate('/songs')}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button type="submit" className="btn">
          {isEditing ? 'Update' : 'Create'} Song
        </button>
      </div>
    </form>
  );
}