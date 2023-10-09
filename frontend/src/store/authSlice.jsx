// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    userName: null, // Add userName field to the initial state
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.userName = action.payload.userName; // Set the userName from the payload
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userName = null; // Clear the userName when logging out
    },
    
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const selectToken = (state) => state.initialState

export default authSlice.reducer;
