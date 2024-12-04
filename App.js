import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from './src/redux/store';
import { login } from './src/redux/AuthSlice';
import { loadItems } from './src/redux/shoppingListSlice';
import AuthScreen from './src/components/AuthScreen';
import ShoppingList from './src/components/ShoppingList';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userJson = await SecureStore.getItemAsync('user');
        const shoppingListJson = await SecureStore.getItemAsync('shoppingList');
        
        if (userJson) {
          const user = JSON.parse(userJson);
          store.dispatch(login(user));
        }
        
        if (shoppingListJson) {
          const items = JSON.parse(shoppingListJson);
          store.dispatch(loadItems(items));
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      }
    };

    checkAuth();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#FF6B35' }, headerTintColor: 'white' }}>
          <Stack.Screen 
            name="Auth" 
            component={AuthScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="ShoppingList" 
            component={ShoppingList} 
            options={{ title: 'My Shopping List' }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )}

// // App.js
// import React, { useEffect, useState } from 'react';
// import { Provider } from 'react-redux';
// import { store } from './src/redux/store';
// import { useSelector } from 'react-redux';
// import * as SecureStore from 'expo-secure-store';

// import AuthScreen from './src/components/AuthScreen';
// import ShoppingListScreen from './src/components/ShoppingList';

// const AppContent = () => {
//   const { isAuthenticated } = useSelector(state => state.auth);

//   return isAuthenticated ? <ShoppingListScreen /> : <AuthScreen />;
// };

// export default function App() {
//   return (
//     <Provider store={store}>
//       <AppContent />
//     </Provider>
//   );
// }