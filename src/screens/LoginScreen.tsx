
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { loginUser } from '../apis/AuthApi';
import { UserLoginRequest } from '../types/Types';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const request: UserLoginRequest = {
        email,
        password,
      };

      console.log('Sending login request:', request);

      const response = await loginUser(request);

      console.log('Received login response:', response);

      // Handle the response and navigate to the appropriate screen
    } catch (error) {
      console.error('Error occurred during login:', error);
      // Handle the error
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;