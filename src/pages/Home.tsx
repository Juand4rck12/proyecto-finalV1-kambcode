import { Link } from 'react-router-dom';
import { Music2, Users } from 'lucide-react';
import { DataSeeder } from '../components/DataSeeder';

export function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to MusicApp
        </h1>
        <div className="flex gap-4 justify-center mb-12">
          <Link
            to="/artists"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            <Users className="mr-2 h-5 w-5" />
            Browse Artists
          </Link>
          <Link
            to="/songs"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-purple-100 hover:bg-purple-200"
          >
            <Music2 className="mr-2 h-5 w-5" />
            Browse Songs
          </Link>
        </div>
        <DataSeeder />
      </div>
    </div>
  );
}