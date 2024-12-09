// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define User interface
export interface User {
  id: number | null;
  username: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: User = {
  id: null,
  username: null,
  email: null,
  isAuthenticated: false
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Login action
    login: (state, action: PayloadAction<Omit<User, 'isAuthenticated'>>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },

    // Logout action
    logout: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.isAuthenticated = false;
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;