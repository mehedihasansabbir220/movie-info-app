// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import { Search, Film, Star, TrendingUp } from 'lucide-react';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import MovieTrailerModal from '../components/MovieTrailerModal';

export default function HomePage() {
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState<{key?: string, title: string}>({
    key: undefined,
    title: ''
  });

  // Genres for filtering
  const genres = [
    { id: 28, name: 'Action', icon: <Film size={16} /> },
    { id: 35, name: 'Comedy', icon: <Star size={16} /> },
    { id: 18, name: 'Drama', icon: <TrendingUp size={16} /> },
    { id: 27, name: 'Horror', icon: <Search size={16} /> },
    { id: 10749, name: 'Romance', icon: <Film size={16} /> },
    { id: 53, name: 'Thriller', icon: <Star size={16} /> }
  ];

  // Handler for opening trailer modal
  const openTrailerModal = (trailerKey: string, movieTitle: string) => {
    setSelectedTrailer({ key: trailerKey, title: movieTitle });
    setTrailerModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      {/* Enhanced Header Section */}
      <header className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-20 animate-pulse"></div>

        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Cinematic Universe
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 leading-relaxed">
              Your Gateway to Endless Entertainment and Movie Magic
            </p>

            {/* Search and Filter Section */}
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />

              {/* Genre Filter */}
              <div className="mt-6 flex justify-center space-x-2 flex-wrap">
                {genres.map((genreItem) => (
                  <button
                    key={genreItem.id}
                    onClick={() => setGenre(genre === genreItem.id.toString() ? '' : genreItem.id.toString())}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full text-sm m-1 transition-all duration-300
                      ${genre === genreItem.id.toString() 
                        ? 'bg-white text-blue-600 shadow-lg' 
                        : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'}
                    `}
                  >
                    {genreItem.icon}
                    {genreItem.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Movies Section */}
      <main className="container mx-auto px-4 py-8">
        {/* Movie List Component */}
        <MovieList 
          searchTerm={searchTerm}
          selectedGenre={genre}
          onTrailerClick={openTrailerModal}
        />
      </main>

      {/* Trailer Modal */}
      <MovieTrailerModal 
        isOpen={trailerModalOpen}
        onClose={() => setTrailerModalOpen(false)}
        trailerKey={selectedTrailer.key}
        movieTitle={selectedTrailer.title}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="mb-4">&copy; 2024 Cinematic Universe. All Rights Reserved.</p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}