// import React, { useEffect } from 'react';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './redux/store';
// import * as SecureStore from 'expo-secure-store';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { store } from './src/redux/store';
// import { login } from './src/redux/AuthSlice';
// import { loadItems } from './src/redux/shoppingListSlice';
// import AuthScreen from './src/components/AuthScreen';
// import ShoppingList from './src/components/ShoppingList';
// import * as Font from 'expo-font';
// import { useState } from 'react';

// const Stack = createStackNavigator();

// export default function App() {
//   const [fontsLoaded, setFontsLoaded] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const userJson = await SecureStore.getItemAsync('user');
//         const shoppingListJson = await SecureStore.getItemAsync('shoppingList');
        
//         if (userJson) {
//           const user = JSON.parse(userJson);
//           store.dispatch(login(user));
//         }
        
//         if (shoppingListJson) {
//           const items = JSON.parse(shoppingListJson);
//           store.dispatch(loadItems(items));
//         }
//       } catch (error) {
//         console.error('Authentication check failed:', error);
//       }
//     };

//     checkAuth();
//   }, []);

//   useEffect(() => {
    
//     loadFonts();
//   }, []);


//   async function loadFonts() {
//     await Font.loadAsync({
//       Outfit: require('../shopify/assets/fonts/Outfit/Outfit-VariableFont_wght.ttf'), 
//     });
//     setFontsLoaded(true);
//   }

//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#4a4e69' }, headerTintColor: 'white' }}>
//           <Stack.Screen 
//             name="Auth" 
//             component={AuthScreen} 
//             options={{ headerShown: false }} 
//           />
//           <Stack.Screen 
//             name="ShoppingList" 
//             component={ShoppingList} 
//             options={{ title: 'Shopmate' }} 
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   )}

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { login } from './src/redux/AuthSlice';
import { loadItemsFromStorage } from './src/redux/shoppingListSlice';
import AuthScreen from './src/components/AuthScreen';
import ShoppingList from './src/components/ShoppingList';
import * as Font from 'expo-font';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userJson = await SecureStore.getItemAsync('user');
        
        if (userJson) {
          const user = JSON.parse(userJson);
          store.dispatch(login(user));
          
          // Load shopping list items for the authenticated user
          store.dispatch(loadItemsFromStorage(user.id));
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    loadFonts();
  }, []);

  async function loadFonts() {
    await Font.loadAsync({
      Outfit: require('./assets/fonts/Outfit/Outfit-VariableFont_wght.ttf'), 
    });
    setFontsLoaded(true);
  }

  // Render a loading indicator while fonts and persistence are loading
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate 
        loading={<ActivityIndicator />} 
        persistor={persistor}
      >
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{ 
              headerStyle: { backgroundColor: '#4a4e69' }, 
              headerTintColor: 'white' 
            }}
          >
            <Stack.Screen 
              name="Auth" 
              component={AuthScreen} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="ShoppingList" 
              component={ShoppingList} 
              options={{ title: 'Shopmate' }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}