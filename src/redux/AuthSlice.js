import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null
  },
  reducers: {
    login: (state, action) => {
      const { username, userId } = action.payload;
      state.isAuthenticated = true;
      state.user = { username, userId };

      // Save user data to AsyncStorage
      AsyncStorage.setItem('user', JSON.stringify({ username, userId }));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;

      // Remove user data from AsyncStorage
      AsyncStorage.removeItem('user');
    },
    // Add a restore session reducer
    restoreSession: (state) => {
      // Fetch the user data from AsyncStorage
      AsyncStorage.getItem('user').then(userString => {
        if (userString) {
          const user = JSON.parse(userString);
          state.isAuthenticated = true;
          state.user = user;
        }
      });
    }
  }
});

export const { login, logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;
