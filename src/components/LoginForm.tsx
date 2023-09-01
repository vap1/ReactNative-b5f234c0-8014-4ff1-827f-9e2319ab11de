
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import loginUser, { UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError('');

      // Log: LoginForm - handleLogin - Sending login request
      console.log('Sending login request:', { email, password });

      const loginData: UserLoginRequest = {
        email,
        password,
      };

      // Call the loginUser API function
      const response: UserLoginResponse = await loginUser(loginData);

      // Log: LoginForm - handleLogin - Login response received
      console.log('Login response received:', response);

      if (response.success) {
        // Handle successful login
      } else {
        setError(response.message);
      }
    } catch (error) {
      // Log: LoginForm - handleLogin - Error occurred during login
      console.error('Error occurred during login:', error);

      setError('An error occurred during login.');
    } finally {
      setLoading(false);
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
      <Button
        title={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default LoginForm;