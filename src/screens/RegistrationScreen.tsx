
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
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

      // Log: RegistrationScreen - handleRegistration - Sending user registration request
      console.log('Sending user registration request:', { name, email, password });

      const request: UserRegistrationRequest = {
        name,
        email,
        password,
      };

      // Call the registerUser API function
      const response: UserRegistrationResponse = await registerUser(request);

      // Log: RegistrationScreen - handleRegistration - User registration response received
      console.log('User registration response received:', response);

      if (response.success) {
        // Registration successful
        // Show success message or navigate to the login screen
      } else {
        // Registration failed
        setErrorMessage(response.message);
      }
    } catch (error) {
      // Log: RegistrationScreen - handleRegistration - Error occurred during user registration
      console.error('Error occurred during user registration:', error);

      setErrorMessage('An error occurred during registration. Please try again.');
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