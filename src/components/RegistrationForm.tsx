
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

import { registerUser, UserRegistrationRequest, UserRegistrationResponse } from '../apis/UserApi';
import { UserContext } from '../contexts/UserContext';

const RegistrationForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegistration = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Create the registration request object
      const registrationRequest: UserRegistrationRequest = {
        name,
        email,
        password,
      };

      console.log('Registration Request:', registrationRequest);

      // Make the API call to register the user
      const registrationResponse: UserRegistrationResponse = await registerUser(registrationRequest);

      console.log('Registration Response:', registrationResponse);

      if (registrationResponse.success) {
        // Registration successful, update the user context
        // You can use the setUser function from the UserContext to update the user state
        // Example: setUser(registrationResponse.user);

        console.log('User registration successful!');
      } else {
        // Registration failed, display the error message
        setError(registrationResponse.message);

        console.log('User registration failed:', registrationResponse.message);
      }
    } catch (error) {
      // Handle any errors that occur during the registration process
      setError('An error occurred during registration.');

      console.log('Error during user registration:', error);
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
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default RegistrationForm;