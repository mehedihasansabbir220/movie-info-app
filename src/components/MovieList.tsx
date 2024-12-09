// src/components/MovieList.tsx
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchMoviesThunk } from '../redux/slices/movieSlice';
import MovieCard from './MovieCard';

// Update props interface to include onTrailerClick
interface MovieListProps {
  searchTerm?: string;
  selectedGenre?: string;
  onTrailerClick?: (trailerKey: string, movieTitle: string) => void;
}

const MovieList: React.FC<MovieListProps> = ({ 
  searchTerm = '', 
  selectedGenre = '',
  onTrailerClick 
}) => {
  const dispatch = useAppDispatch();
  const { movies, status, page } = useAppSelector((state) => state.movies);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch initial movies
  useEffect(() => {
    dispatch(fetchMoviesThunk(currentPage));
  }, [dispatch, currentPage]);

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter movies based on search and genre
  const filteredMovies = movies.filter((movie) => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedGenre ? movie.genre_ids?.includes(Number(selectedGenre)) : true)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Loading State */}
      {status === 'loading' && currentPage === 1 && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}

      {/* Error State */}
      {status === 'failed' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Failed to load movies. Please try again.
        </div>
      )}

      {/* No Results State */}
      {filteredMovies.length === 0 && status === 'succeeded' && (
        <div className="text-center text-gray-500 py-8">
          No movies found. Try a different search or genre.
        </div>
      )}

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onTrailerClick={onTrailerClick}  // Pass the trailer click handler
          />
        ))}
      </div>

      {/* Additional Loading Indicator for Pagination */}
      {status === 'loading' && currentPage > 1 && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default MovieList;