
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { useAuthContext } from '../contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();

  const handleLogin = async () => {
    console.log('Logging in...');
    try {
      const request: UserLoginRequest = {
        email,
        password,
      };

      const response: UserLoginResponse = await loginUser(request);
      console.log('Login successful:', response);

      // Call the login function from the AuthContext to update the authentication state
      login(response.token);
    } catch (error) {
      console.error('Login failed:', error);
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