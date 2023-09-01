
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { useAuthContext } from '../contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthToken } = useAuthContext();

  const handleLogin = async () => {
    try {
      // Log: Sending login request to the server
      console.log('Sending login request to the server');

      const request: UserLoginRequest = {
        email,
        password,
      };

      // Call the loginUser API function
      const response: UserLoginResponse = await loginUser(request);

      if (response.success) {
        // Log: Login successful
        console.log('Login successful');

        // Set the auth token in the context
        setAuthToken(response.token);
      } else {
        // Log: Login failed
        console.log('Login failed:', response.message);
      }
    } catch (error) {
      // Log: Login failed
      console.error('Login failed:', error);
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

export default LoginForm;