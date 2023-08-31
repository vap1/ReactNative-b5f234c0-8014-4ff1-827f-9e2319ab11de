
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { AuthContext } from '../contexts/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { setToken } = React.useContext(AuthContext);

  const handleLogin = async () => {
    try {
      // Step 1: User taps on the "Login" button
      console.log('User tapped on the "Login" button');

      // Step 2: Validate input fields
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }

      // Step 3: Create the login request object
      const loginRequest: UserLoginRequest = {
        email,
        password,
      };

      // Step 4: Make the API call to login the user
      const response: UserLoginResponse = await loginUser(loginRequest);
      console.log('API response:', response);

      // Step 5: Check the API response
      if (response.success) {
        // Step 6: Update the token in the AuthContext
        setToken(response.token);
        console.log('User logged in successfully');
      } else {
        setError(response.message);
        console.log('Login failed:', response.message);
      }
    } catch (error) {
      setError('An error occurred during login');
      console.log('Login error:', error);
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
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default LoginScreen;