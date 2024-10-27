import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Artist } from '../types';
import { api } from '../api';

interface ArtistFormProps {
  artist?: Artist;
  onSubmit?: () => void;
}

export function ArtistForm({ artist, onSubmit }: ArtistFormProps) {
  const navigate = useNavigate();
  const isEditing = !!artist;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const artistData = {
      name: formData.get('name') as string,
      bio: formData.get('bio') as string,
      photoUrl: formData.get('photoUrl') as string,
    };

    try {
      if (isEditing && artist) {
        await api.updateArtist(artist.id, artistData);
        toast.success('Artist updated successfully');
      } else {
        await api.createArtist(artistData);
        toast.success('Artist created successfully');
      }
      onSubmit?.();
      navigate('/artists');
    } catch (error) {
      toast.error(isEditing ? 'Failed to update artist' : 'Failed to create artist');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          defaultValue={artist?.name}
          className="input mt-1"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Biography
        </label>
        <textarea
          name="bio"
          id="bio"
          rows={4}
          required
          defaultValue={artist?.bio}
          className="input mt-1"
        />
      </div>

      <div>
        <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">
          Photo URL
        </label>
        <input
          type="url"
          name="photoUrl"
          id="photoUrl"
          required
          defaultValue={artist?.photoUrl}
          className="input mt-1"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate('/artists')}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button type="submit" className="btn">
          {isEditing ? 'Update' : 'Create'} Artist
        </button>
      </div>
    </form>
  );
}