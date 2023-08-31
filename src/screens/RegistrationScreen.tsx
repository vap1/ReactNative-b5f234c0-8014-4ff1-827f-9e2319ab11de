
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistration = () => {
    if (!name || !email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Perform API call for user registration
    // Replace `registerUser` with the actual API call
    registerUser(name, email, password)
      .then((response) => {
        setIsLoading(false);
        if (response.success) {
          console.log('Registration successful');
          // Redirect to the login screen or perform any other necessary action
        } else {
          setErrorMessage(response.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMessage('An error occurred. Please try again later.');
        console.error('Registration error:', error);
      });
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
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Button
        title={isLoading ? 'Loading...' : 'Register'}
        onPress={handleRegistration}
        disabled={isLoading}
      />
    </View>
  );
};

export default RegistrationScreen;