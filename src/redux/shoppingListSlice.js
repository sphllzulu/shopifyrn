import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      const { name, quantity, userId, category } = action.payload;
      const newItem = {
        id: Date.now(),
        name,
        quantity: quantity || 0,
        purchased: false,
        userId,
        category: category || 'groceries' 
      };
      state.items.push(newItem);

      // Save user-specific shopping list
      AsyncStorage.setItem(`shoppingList_${userId}`, JSON.stringify(state.items));
    },
    updateItem: (state, action) => {
      const { itemId, userId, name, quantity, category } = action.payload;
      const itemIndex = state.items.findIndex(
        item => item.id === itemId && item.userId === userId
      );

      if (itemIndex !== -1) {
        // Update the item with the new details
        state.items[itemIndex] = {
          ...state.items[itemIndex],
          name: name || state.items[itemIndex].name,
          quantity: quantity !== undefined ? quantity : state.items[itemIndex].quantity,
          category: category || state.items[itemIndex].category
        };

        // Save updated user-specific shopping list
        AsyncStorage.setItem(`shoppingList_${userId}`, JSON.stringify(state.items));
      }
    },
    
    togglePurchased: (state, action) => {
      const { itemId, userId } = action.payload;
      const item = state.items.find(item => item.id === itemId);

      if (item && item.userId === userId) {
        item.purchased = !item.purchased;

        // Save updated user-specific shopping list
        AsyncStorage.setItem(`shoppingList_${userId}`, JSON.stringify(state.items));
      }
    },
    removeItem: (state, action) => {
      const { itemId, userId } = action.payload;

      // Filter out the specific item and ensure it belongs to the user
      state.items = state.items.filter(item => 
        item.id !== itemId || item.userId !== userId
      );

      // Save updated user-specific shopping list
      AsyncStorage.setItem(`shoppingList_${userId}`, JSON.stringify(state.items));
    },
    loadItems: (state, action) => {
      state.items = action.payload;
    },
    initializeUserItems: (state, action) => {
      const { userId } = action.payload;

      // Retrieve user-specific shopping list from AsyncStorage
      AsyncStorage.getItem(`shoppingList_${userId}`).then(itemsString => {
        if (itemsString) {
          // Parse and set user-specific items
          const userItems = JSON.parse(itemsString);
          state.items = userItems.filter(item => item.userId === userId);
        }
      });
    }
  }
});

export const { 
  addItem, 
  updateItem,
  togglePurchased, 
  removeItem, 
  loadItems,
  initializeUserItems 
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Async thunk to load items from storage
// export const loadItemsFromStorage = createAsyncThunk(
//   'shoppingList/loadItemsFromStorage',
//   async (userId) => {
//     try {
//       const itemsString = await AsyncStorage.getItem(`shoppingList_${userId}`);
//       return itemsString ? JSON.parse(itemsString) : [];
//     } catch (error) {
//       console.error('Error loading items from storage', error);
//       return [];
//     }
//   }
// );

// const shoppingListSlice = createSlice({
//   name: 'shoppingList',
//   initialState: {
//     items: [],
//     status: 'idle',
//     error: null
//   },
//   reducers: {
//     addItem: (state, action) => {
//       const { name, quantity, userId, category } = action.payload;
//       const newItem = {
//         id: Date.now(),
//         name,
//         quantity: quantity || 1,
//         purchased: false,
//         userId,
//         category: category || 'groceries'
//       };
//       state.items.push(newItem);
      
//       // Save to AsyncStorage
//       AsyncStorage.setItem(`shoppingList_${userId}`, JSON.stringify(state.items));
//     },
//     updateItem: (state, action) => {
//       const { itemId, userId, name, quantity, category } = action.payload;
//       const itemIndex = state.items.findIndex(
//         item => item.id === itemId && item.userId === userId
//       );

//       if (itemIndex !== -1) {
//         state.items[itemIndex] = {
//           ...state.items[itemIndex],
//           name: name || state.items[itemIndex].name,
//           quantity: quantity !== undefined ? quantity : state.items[itemIndex].quantity,
//           category: category || state.items[itemIndex].category
//         };

//         // Save to AsyncStorage
//         AsyncStorage.setItem(`shoppingList_${userId}`, JSON.stringify(state.items));
//       }
//     },
//     togglePurchased: (state, action) => {
//       const { itemId, userId } = action.payload;
//       const item = state.items.find(item => item.id === itemId);
      
//       if (item && item.userId === userId) {
//         item.purchased = !item.purchased;
        
//         // Save to AsyncStorage
//         AsyncStorage.setItem(`shoppingList_${userId}`, JSON.stringify(state.items));
//       }
//     },
//     removeItem: (state, action) => {
//       const { itemId, userId } = action.payload;
      
//       // Filter out the specific item and ensure it belongs to the user
//       state.items = state.items.filter(item => 
//         item.id !== itemId || item.userId !== userId
//       );
      
//       // Save to AsyncStorage
//       AsyncStorage.setItem(`shoppingList_${userId}`, JSON.stringify(state.items));
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loadItemsFromStorage.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(loadItemsFromStorage.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload;
//       })
//       .addCase(loadItemsFromStorage.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   }
// });

// export const {
//   addItem,
//   updateItem,
//   togglePurchased,
//   removeItem
// } = shoppingListSlice.actions;

// export default shoppingListSlice.reducer;