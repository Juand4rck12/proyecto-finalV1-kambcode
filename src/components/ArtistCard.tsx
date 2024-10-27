import React from 'react';
import { Link } from 'react-router-dom';
import { Artist } from '../types';
import { Music2 } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link to={`/artists/${artist.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
        <div className="aspect-square relative">
          <img
            src={artist.photoUrl}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Music2 className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{artist.name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{artist.bio}</p>
        </div>
      </div>
    </Link>
  );
}