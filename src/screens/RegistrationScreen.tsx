
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { registerUser, UserRegistrationRequest, UserRegistrationResponse } from '../apis/UserApi';

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const request: UserRegistrationRequest = {
        name,
        email,
        password,
      };

      console.log('Sending registration request:', request);

      const response: UserRegistrationResponse = await registerUser(request);

      console.log('Received registration response:', response);

      if (response.success) {
        console.log('Registration successful!');
        // Redirect to the login screen or perform any other necessary actions
      } else {
        console.log('Registration failed:', response.message);
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.log('Error occurred during registration:', error.message);
      setErrorMessage('An error occurred during registration. Please try again later.');
    }

    setIsLoading(false);
  };

  return (
    <View>
      <Text>Registration Screen</Text>
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