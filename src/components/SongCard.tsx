import React from 'react';
import { Link } from 'react-router-dom';
import { Song } from '../types';
import { Play } from 'lucide-react';

interface SongCardProps {
  song: Song;
}

export function SongCard({ song }: SongCardProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Link to={`/songs/${song.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
        <div className="aspect-square relative">
          <img
            src={song.coverUrl}
            alt={song.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{song.title}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {song.artist?.name} • {song.releaseYear}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {formatDuration(song.duration)}
          </p>
        </div>
      </div>
    </Link>
  );
}