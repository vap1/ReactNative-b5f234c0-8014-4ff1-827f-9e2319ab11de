
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';
import { registerUser } from '../apis/UserApi';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      // Create the registration request object
      const request: UserRegistrationRequest = {
        name,
        email,
        password,
      };

      // Log the registration request
      console.log('User Registration Request:', request);

      // Make the API call to register the user
      const response: UserRegistrationResponse = await registerUser(request);

      // Log the registration response
      console.log('User Registration Response:', response);

      if (response.success) {
        // Registration successful
        alert('Registration successful');
      } else {
        // Registration failed
        setErrorMessage(response.message);
      }
    } catch (error) {
      // Log any errors that occur during the registration process
      console.error('Error registering user:', error);
      setErrorMessage('Error registering user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text>Registration Form</Text>
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
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Button
        title={isLoading ? 'Loading...' : 'Register'}
        onPress={handleRegistration}
        disabled={isLoading}
      />
    </View>
  );
};

export default RegistrationForm;