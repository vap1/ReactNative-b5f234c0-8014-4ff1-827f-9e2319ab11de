
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { useAuthContext } from '../contexts/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthToken } = useAuthContext();

  const handleLogin = async () => {
    try {
      console.log('Sending login request to the server'); // Log: Sending login request to the server

      const request: UserLoginRequest = {
        email,
        password,
      };

      const response: UserLoginResponse = await loginUser(request); // Call the loginUser API function

      if (response.success) {
        console.log('Login successful'); // Log: Login successful

        setAuthToken(response.token); // Set the auth token in the context
      } else {
        console.log('Login failed:', response.message); // Log: Login failed
      }
    } catch (error) {
      console.error('Login failed:', error); // Log: Login failed
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