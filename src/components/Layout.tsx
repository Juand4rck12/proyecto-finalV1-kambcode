import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Music2, Users } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center px-2 py-2 text-purple-600 hover:text-purple-900">
                <Music2 className="h-6 w-6 mr-2" />
                <span className="font-bold text-xl">MusicApp</span>
              </Link>
              
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/artists"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-purple-600"
                >
                  <Users className="h-4 w-4 mr-1" />
                  Artists
                </Link>
                <Link
                  to="/songs"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-purple-600"
                >
                  <Music2 className="h-4 w-4 mr-1" />
                  Songs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}