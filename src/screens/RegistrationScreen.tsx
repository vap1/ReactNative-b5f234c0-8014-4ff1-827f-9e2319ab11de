
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { registerUser, UserRegistrationRequest, UserRegistrationResponse } from '../apis/UserApi';
import { useAuthContext } from '../contexts/AuthContext';

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuthContext();

  const handleRegistration = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Create the user registration request object
      const registrationRequest: UserRegistrationRequest = {
        name,
        email,
        password,
      };

      // Call the registerUser API
      const response: UserRegistrationResponse = await registerUser(registrationRequest);

      if (response.success) {
        // Registration successful, log in the user
        await login(email, password);
      } else {
        // Registration failed, display the error message
        setErrorMessage(response.message);
      }
    } catch (error) {
      // Handle any API errors
      setErrorMessage('An error occurred during registration.');
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

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Button title="Register" onPress={handleRegistration} />
      )}

      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default RegistrationScreen;