
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
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

    // Create the registration request object
    const registrationRequest: UserRegistrationRequest = {
      name,
      email,
      password,
    };

    try {
      // Make the API call to register the user
      const response: UserRegistrationResponse = await registerUser(registrationRequest);

      if (response.success) {
        console.log('Registration successful');
        // Redirect to the login screen or show a success message
      } else {
        console.log('Registration failed:', response.message);
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.log('Registration error:', error.message);
      setErrorMessage('An error occurred during registration');
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