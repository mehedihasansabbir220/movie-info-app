import { fetchMovies } from '@/services/movieService';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define movie interface
export interface Movie {
  genre_ids: any;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

// Define initial state interface
interface MovieState {
  movies: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  page: number;
}

// Initial state
const initialState: MovieState = {
  movies: [],
  status: 'idle',
  error: null,
  page: 1
};

// Async thunk for fetching movies
export const fetchMoviesThunk = createAsyncThunk(
  'movies/fetchMovies',
  async (page: number = 1) => {
    const response = await fetchMovies(page);
    return response.results;
  }
);

// Movie slice
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // Reset movies state
    resetMovies: (state) => {
      state.movies = [];
      state.page = 1;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMoviesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Append new movies to existing list
        state.movies = [...state.movies, ...action.payload];
        state.page += 1;
      })
      .addCase(fetchMoviesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      });
  }
});

export const { resetMovies } = movieSlice.actions;
export default movieSlice.reducer;