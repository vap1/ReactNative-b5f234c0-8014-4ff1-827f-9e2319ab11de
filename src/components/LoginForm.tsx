
import React, { useState } from 'react';
import { Text, TextInput, Button } from 'react-native';
import { UserLoginRequest, UserLoginResponse } from '../types/Types';
import loginUser from '../apis/AuthApi';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      // Validate input
      if (!email || !password) {
        setErrorMessage('Please enter your email and password');
        return;
      }

      // Create login request object
      const request: UserLoginRequest = {
        email,
        password,
      };

      // Make API call to login user
      console.log('Making login API call...');
      console.log('Request:', request);
      const response: UserLoginResponse = await loginUser(request);
      console.log('Response:', response);

      // Check login response
      if (response.success) {
        // Login successful, perform necessary actions
        console.log('Login successful');
      } else {
        // Login failed, display error message
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred while logging in');
    }
  };

  return (
    <>
      <Text>Login</Text>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
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