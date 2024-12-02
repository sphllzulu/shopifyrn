
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import shoppingListReducer from './shoppingListSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shoppingList: shoppingListReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});