// src/components/MovieCard.tsx
import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

// Define the props interface
interface MovieCardProps {
  movie: any;
  onTrailerClick?: (trailerKey: string, movieTitle: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onTrailerClick }) => {
  // Function to handle trailer click
  const handleTrailerClick = () => {
    // Assuming you have a trailer key in your movie object
    // If not, you'll need to fetch this separately
    if (onTrailerClick && movie.trailer_key) {
      onTrailerClick(movie.trailer_key, movie.title);
    }
  };

  return (
    <div className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105">
      {/* Movie Poster */}
      <div className="relative w-full aspect-[2/3]">
        <Image 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
          fill
          className="object-cover"
        />
        
        {/* Trailer Button Overlay */}
        {onTrailerClick && movie.trailer_key && (
          <button 
            onClick={handleTrailerClick}
            className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          >
            <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
              <Play className="text-white" size={32} fill="white" />
            </div>
          </button>
        )}
      </div>

      {/* Movie Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white line-clamp-1">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-400">
            {new Date(movie.release_date).getFullYear()}
          </span>
          <div className="flex items-center text-yellow-500">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.953a1.5 1.5 0 001.421 1.033h4.171c.949 0 1.341 1.154.577 1.622l-3.38 2.458a1.5 1.5 0 00-.54 1.659l1.286 3.953c.3.921-.755 1.688-1.54 1.118l-3.38-2.458a1.5 1.5 0 00-1.76 0l-3.38 2.458c-.784.57-1.838-.197-1.54-1.118l1.286-3.953a1.5 1.5 0 00-.54-1.659l-3.38-2.458c-.764-.468-.372-1.622.577-1.622h4.171a1.5 1.5 0 001.421-1.033l1.286-3.953z" />
            </svg>
            <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;