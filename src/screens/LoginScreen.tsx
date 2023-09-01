
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { UserLoginRequest, UserLoginResponse } from '../types/Types';
import loginUser from '../apis/AuthApi';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Logging in...');
      const request: UserLoginRequest = {
        email,
        password,
      };

      const response: UserLoginResponse = await loginUser(request);
      console.log('Login response:', response);

      if (response.success) {
        // Handle successful login
        console.log('Login successful');
      } else {
        // Handle login failure
        console.log('Login failed:', response.message);
      }
    } catch (error) {
      console.log('Error occurred during login:', error);
      Alert.alert('Error', 'An error occurred during login. Please try again.');
    }
  };

  return (
    <View>
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;