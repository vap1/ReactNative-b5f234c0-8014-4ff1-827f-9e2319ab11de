
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';
import { registerUser } from '../apis/UserApi';

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const request: UserRegistrationRequest = {
        name,
        email,
        password,
      };

      // Log: Sending user registration request to the server
      console.log('Sending user registration request:', request);

      const response: UserRegistrationResponse = await registerUser(request);

      // Log: User registration successful
      console.log('User registration successful:', response);

      // Reset form fields
      setName('');
      setEmail('');
      setPassword('');

      // Show success message to the user
      alert('User registration successful');
    } catch (error) {
      // Log: User registration failed
      console.error('User registration failed:', error);

      // Show error message to the user
      setErrorMessage('User registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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
        title={isLoading ? 'Loading...' : 'Register'}
        onPress={handleRegistration}
        disabled={isLoading}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
    </View>
  );
};

export default RegistrationScreen;