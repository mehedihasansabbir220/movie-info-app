// src/components/MovieDetailsHeader.tsx
import React from 'react';
import Image from 'next/image';
import { Star, Clock, Calendar } from 'lucide-react';

interface MovieDetailsHeaderProps {
  movie: any; // Assuming you have a Movie type defined
}

const MovieDetailsHeader: React.FC<MovieDetailsHeaderProps> = ({ movie }) => {
  return (
    <div className="relative">
      {/* Background Backdrop */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
          fill
          className="object-cover opacity-30 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
      </div>

      {/* Header Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        {/* Poster */}
        <div className="w-64 shrink-0 mb-6 md:mb-0 md:mr-8">
          <Image 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={256}
            height={384}
            className="rounded-lg shadow-2xl"
          />
        </div>

        {/* Movie Info */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4 text-white">{movie.title}</h1>
          
          {/* Movie Stats */}
          <div className="flex justify-center md:justify-start items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-500" fill="currentColor" />
              <span>{movie.vote_average.toFixed(1)}/10</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-blue-400" />
              <span>{movie.runtime} mins</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="text-green-400" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
            {movie.genres.map((genre:any) => (
              <span 
                key={genre.id} 
                className="px-3 py-1 bg-gray-800/50 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsHeader;