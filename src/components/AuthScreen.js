import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/AuthSlice';
import { colors } from '../theme/colors';

const AuthScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();

  const handleAuth = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true); // Start loading

    try {
      const userId = username.toLowerCase();
      await dispatch(login({ username, userId })); // Wait for login to finish
      setLoading(false); // Stop loading
      navigation.replace('ShoppingList');
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      Alert.alert('Error', 'Failed to log in. Please try again later.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <Image
          source={require('../../assets/shoppingList.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleAuth}
          disabled={loading} // Disable the button while loading
        >
          <Text style={styles.buttonText}>
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {isLogin
              ? 'Need an account? Sign Up'
              : 'Already have an account? Sign In'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 10
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    backgroundColor: colors.lightOrange,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  button: {
    backgroundColor: colors.accent,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  switchText: {
    marginTop: 15,
    textAlign: 'center',
    color: colors.accent
  }
});

export default AuthScreen;
