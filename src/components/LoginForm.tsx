
import React, { useState } from 'react';
import { Text, TextInput, Button } from 'react-native';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { useAuthContext } from '../contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuthContext();

  const handleLogin = async () => {
    console.log('Logging in...');
    try {
      const request: UserLoginRequest = {
        email,
        password,
      };

      const response: UserLoginResponse = await loginUser(request);
      console.log('Login response:', response);

      if (response.success) {
        setToken(response.token);
        console.log('Login successful');
      } else {
        console.log('Login failed:', response.message);
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <>
      <Text>Login</Text>
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
    </>
  );
};

export default LoginForm;