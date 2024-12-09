// src/app/movie/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
// import { fetchMovieDetailsThunk } from '../../../redux/slices/movieDetailsSlice';
import MovieDetailsHeader from '@/components/MovieDetailsHeader';
import MovieTrailer from '@/components/MovieTrailer';
// import MovieComments from '../../../components/MovieComments';
// import MovieRating from '../../../components/MovieRating';

export default function MovieDetailsPage() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const movieId = Array.isArray(params.id) ? params.id[0] : params.id;

  // Fetch movie details when component mounts
//   useEffect(() => {
//     if (movieId) {
//       dispatch(fetchMovieDetailsThunk(movieId));
//     }
//   }, [movieId, dispatch]);

  // Select movie details from Redux store
  const { movie, status, error } = useAppSelector((state) => state.movieDetails);

  // State for active section
  const [activeSection, setActiveSection] = useState<'trailer' | 'details' | 'comments'>('trailer');

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center text-red-500 py-16">
        Failed to load movie details: {error}
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center py-16">No movie found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Movie Details Header */}
      <MovieDetailsHeader movie={movie} />

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex justify-center space-x-4 mb-8">
          {['trailer', 'details', 'comments'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section as any)}
              className={`
                px-4 py-2 rounded-full text-sm uppercase tracking-wider transition-all
                ${activeSection === section 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
              `}
            >
              {section}
            </button>
          ))}
        </div>

        {/* Conditional Rendering of Sections */}
        {activeSection === 'trailer' && <MovieTrailer movie={movie} />}
        
        {activeSection === 'details' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
              <p className="text-gray-300">{movie.overview}</p>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Additional Details</h3>
                <ul className="space-y-2">
                  <li><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}</li>
                  <li><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</li>
                  <li><strong>Runtime:</strong> {movie.runtime} minutes</li>
                  <li><strong>Original Language:</strong> {movie.original_language}</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Cast</h2>
              <div className="grid grid-cols-3 gap-4">
                {movie.credits?.cast?.slice(0, 6).map((actor:any) => (
                  <div key={actor.id} className="text-center">
                    {actor.profile_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
                        alt={actor.name} 
                        className="rounded-full w-24 h-24 object-cover mx-auto mb-2"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-2 flex items-center justify-center">
                        No Image
                      </div>
                    )}
                    <p className="text-sm">{actor.name}</p>
                    <p className="text-xs text-gray-400">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeSection === 'comments' && (
          <div className="max-w-4xl mx-auto">
            {/* Movie Rating Component */}
            {/* <MovieRating movieId={movie.id} /> */}
            
            {/* Comments Section */}
            {/* <MovieComments movieId={movie.id} /> */}
          </div>
        )}
      </div>
    </div>
  );
}