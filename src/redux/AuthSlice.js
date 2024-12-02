import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      SecureStore.setItemAsync('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      SecureStore.deleteItemAsync('user');
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;