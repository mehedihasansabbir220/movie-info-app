// src/components/MovieTrailerModal.tsx
import React from 'react';
import { X } from 'lucide-react';

interface MovieTrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerKey?: string;
  movieTitle: string;
}

const MovieTrailerModal: React.FC<MovieTrailerModalProps> = ({ 
  isOpen, 
  onClose, 
  trailerKey,
  movieTitle 
}) => {
  if (!isOpen || !trailerKey) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-60 text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>
        
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">{movieTitle} - Trailer</h2>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={`${movieTitle} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieTrailerModal;