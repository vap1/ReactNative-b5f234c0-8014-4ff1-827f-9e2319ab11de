
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { useAuthContext } from '../contexts/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuthContext();

  const handleLogin = async () => {
    console.log('Login button clicked');
    try {
      const request: UserLoginRequest = {
        email,
        password,
      };

      console.log('Sending login request:', request);
      const response: UserLoginResponse = await loginUser(request);

      console.log('Received login response:', response);
      if (response.success) {
        setToken(response.token);
        console.log('Login successful');
      } else {
        console.log('Login failed:', response.message);
      }
    } catch (error) {
      console.log('Error occurred during login:', error);
    }
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
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;