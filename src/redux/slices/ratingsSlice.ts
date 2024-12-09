// src/redux/slices/ratingsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for fetching movie ratings
export const fetchMovieRatingsThunk = createAsyncThunk(
  'ratings/fetchMovieRatings',
  async (movieId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/movies/${movieId}/ratings`);
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for adding/updating rating
export const addRatingThunk = createAsyncThunk(
  'ratings/addRating',
  async (
    { movieId, userId, rating }: 
    { movieId: number, userId: string, rating: number }, 
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/api/ratings', { 
        movieId, 
        userId, 
        rating 
      });
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Ratings Slice
const ratingsSlice = createSlice({
  name: 'ratings',
  initialState: {
    averageRating: 0,
    userCurrentRating: 0,
    totalRatings: 0,
    status: 'idle',
    error: null as string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Ratings
      .addCase(fetchMovieRatingsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieRatingsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.averageRating = action.payload.averageRating;
        state.totalRatings = action.payload.totalRatings;
        state.userCurrentRating = action.payload.userCurrentRating || 0;
      })
      .addCase(fetchMovieRatingsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Add Rating
      .addCase(addRatingThunk.fulfilled, (state, action) => {
        state.userCurrentRating = action.payload.rating;
        state.averageRating = action.payload.newAverageRating;
        state.totalRatings = action.payload.totalRatings;
      });
  }
});

export default ratingsSlice.reducer;