
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { useAuthContext } from '../contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn } = useAuthContext();

  const handleLogin = async () => {
    console.log('Login form submitted');
    try {
      const request: UserLoginRequest = {
        email,
        password,
      };

      console.log('Sending login request:', request);
      const response: UserLoginResponse = await loginUser(request);
      console.log('Received login response:', response);

      if (response.success) {
        console.log('Login successful');
        setLoggedIn(true);
      } else {
        console.log('Login failed:', response.message);
      }
    } catch (error) {
      console.log('Error occurred during login:', error);
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />

      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginForm;