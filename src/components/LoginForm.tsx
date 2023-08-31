
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { useAuthContext } from '../contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuthContext();

  const handleLogin = async () => {
    try {
      // Step 1: Validate input
      if (!email || !password) {
        Alert.alert('Error', 'Please enter email and password');
        return;
      }

      // Step 2: Create login request
      const loginRequest: UserLoginRequest = {
        email,
        password,
      };

      // Step 3: Make API call to login user
      const response: UserLoginResponse = await loginUser(loginRequest);

      // Step 4: Handle API response
      if (response.success) {
        // Step 5: Set token in context
        setToken(response.token);
        Alert.alert('Success', 'Login successful');
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };

  return (
    <View>
      {/* Step 6: Render email input */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      {/* Step 7: Render password input */}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Step 8: Render login button */}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginForm;