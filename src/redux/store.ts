// src/redux/store.ts
import { 
    configureStore, 
    ThunkAction, 
    Action 
  } from '@reduxjs/toolkit';
  import { 
    useDispatch, 
    useSelector, 
    TypedUseSelectorHook 
  } from 'react-redux';
  
  // Import reducers
  import movieReducer from './slices/movieSlice';
  import userReducer from './slices/userSlice';
  import  useMovieDetailsReducer from './slices/movieSlice'
  
  // Create the store with enhanced configuration
  export const store = configureStore({
    // Combine reducers
    reducer: {
      movies: movieReducer,
      user: userReducer,
      movieDetails:useMovieDetailsReducer
    },
    
    // Enhanced middleware configuration
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: false, // Allows non-serializable values
        immutableCheck: false     // Improves performance
      }),
  
    // Optional: Enable Redux DevTools
    devTools: process.env.NODE_ENV !== 'production'
  });
  
  // Define typed hooks for better TypeScript integration
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  // Custom typed hooks for easier Redux usage
  export const useAppDispatch: () => AppDispatch = useDispatch;
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  
  // Define type for async thunks
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;