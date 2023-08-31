
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import { UserLoginRequest } from '../apis/AuthApi';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Validate input
      if (!email || !password) {
        throw new Error('Please enter your email and password.');
      }

      // Create login request
      const loginRequest: UserLoginRequest = {
        email,
        password,
      };

      // Call the login API
      const response = await loginUser(loginRequest);

      if (response.success) {
        // Login successful, navigate to the Profile screen
        navigation.navigate('Profile');
      } else {
        // Login failed, display error message
        setError(response.message);
      }
    } catch (error) {
      // Handle any errors during login
      setError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={isLoading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={isLoading}
      />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default LoginScreen;