
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';
import { registerUser } from '../apis/UserApi';

const RegistrationScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      // Log the registration request
      console.log('Registration request:', { name, email, password });

      // Make the API call to register the user
      const request: UserRegistrationRequest = { name, email, password };
      const response: UserRegistrationResponse = await registerUser(request);

      // Log the registration response
      console.log('Registration response:', response);

      // Handle the registration success or failure
      if (response.success) {
        // Registration successful
        console.log('User registration successful');
      } else {
        // Registration failed
        console.log('User registration failed');
      }
    } catch (error) {
      // Log any errors that occur during registration
      console.error('Registration error:', error);
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
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

export default RegistrationScreen;