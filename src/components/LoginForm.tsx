
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { AuthContext } from '../contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setToken } = React.useContext(AuthContext);

  const handleLogin = async () => {
    console.log('Logging in...');
    setError('');

    try {
      const request: UserLoginRequest = {
        email,
        password,
      };

      const response: UserLoginResponse = await loginUser(request);
      console.log('Login response:', response);

      if (response.success) {
        setToken(response.token);
        console.log('Login successful!');
      } else {
        setError(response.message);
        console.log('Login failed:', response.message);
      }
    } catch (error) {
      setError('An error occurred during login.');
      console.error('Login error:', error);
    }
  };

  return (
    <View>
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
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default LoginForm;