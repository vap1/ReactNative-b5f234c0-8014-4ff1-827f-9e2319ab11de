
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { UserLoginRequest, UserLoginResponse } from '../types/Types';
import { loginUser } from '../apis/AuthApi';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Log the login request
      console.log('Login request:', { email, password });

      // Make the API call to login
      const request: UserLoginRequest = { email, password };
      const response: UserLoginResponse = await loginUser(request);

      // Log the login response
      console.log('Login response:', response);

      // Update the user token if login is successful
      if (response.success) {
        console.log('User login successful');
      } else {
        console.log('User login failed');
      }
    } catch (error) {
      // Log any errors that occur during login
      console.error('Login error:', error);
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