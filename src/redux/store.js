
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './AuthSlice';
// import shoppingListReducer from './shoppingListSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     shoppingList: shoppingListReducer
//   },
//   middleware: (getDefaultMiddleware) => 
//     getDefaultMiddleware({
//       serializableCheck: false
//     })
// });

import { configureStore } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your reducers
import authReducer from './AuthSlice';
import shoppingListReducer from './shoppingListSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  // Optionally whitelist specific reducers to persist
  whitelist: ['auth'] // Add other reducers you want to persist
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    shoppingList: shoppingListReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

const persistor = persistStore(store);

export { store, persistor };