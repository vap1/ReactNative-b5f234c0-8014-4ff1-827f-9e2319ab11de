
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

import { UserLoginRequest } from '../types/Types';
import { loginUser } from '../apis/AuthApi';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Login button pressed');
    console.log('Email:', email);
    console.log('Password:', password);

    const request: UserLoginRequest = {
      email,
      password,
    };

    try {
      const response = await loginUser(request);
      console.log('Login API response:', response);
      // Handle the response and perform necessary actions
    } catch (error) {
      console.error('Login API error:', error);
      // Handle the error and display an error message
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

export default LoginForm;