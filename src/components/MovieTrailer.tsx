// src/components/MovieTrailer.tsx
import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface MovieTrailerProps {
  movie: any;
}

const MovieTrailer: React.FC<MovieTrailerProps> = ({ movie }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  // Fetch trailer when component mounts
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        // Assuming you have an API method to fetch trailer
        const response = await fetch(`/api/movies/${movie.id}/trailer`);
        const data = await response.json();
        setTrailerKey(data.trailer_key);
      } catch (error) {
        console.error('Failed to fetch trailer', error);
      }
    };

    fetchTrailer();
  }, [movie.id]);

  if (!trailerKey) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
          title={`${movie.title} Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0"
        />
      </div>
    </div>
  );
};

export default MovieTrailer;