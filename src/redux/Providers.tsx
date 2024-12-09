// src/redux/Providers.tsx
'use client'; // Ensures client-side rendering for Redux provider

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store'; // Import the Redux store

// Define props type for TypeScript
interface ProvidersProps {
  children: React.ReactNode; // Type for child components
}

/**
 * Redux Providers Wrapper Component
 * - Wraps the entire application with Redux Provider
 * - Enables global state management across the app
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      {/* 
        Provider makes Redux store available to 
        all nested components via React context 
      */}
      {children}
    </Provider>
  );
}