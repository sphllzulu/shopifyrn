// src/redux/shoppingListSlice.js
import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push({
        id: Date.now(),
        name: action.payload.name,
        quantity: action.payload.quantity || 1,
        purchased: false
      });
      SecureStore.setItemAsync('shoppingList', JSON.stringify(state.items));
    },
    togglePurchased: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.purchased = !item.purchased;
        SecureStore.setItemAsync('shoppingList', JSON.stringify(state.items));
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      SecureStore.setItemAsync('shoppingList', JSON.stringify(state.items));
    },
    loadItems: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const { addItem, togglePurchased, removeItem, loadItems } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;