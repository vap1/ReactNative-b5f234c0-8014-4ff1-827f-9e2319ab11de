
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { registerUser } from '../apis/UserApi';
import { UserRegistrationRequest } from '../types/Types';

const RegistrationForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      const request: UserRegistrationRequest = {
        name,
        email,
        password,
      };

      // Log the registration request
      console.log('Registration Request:', request);

      // Make the API call to register the user
      const response = await registerUser(request);

      // Log the registration response
      console.log('Registration Response:', response);

      // Show success message to the user
      Alert.alert('Success', response.message);
    } catch (error) {
      // Log any errors
      console.error('Registration Error:', error);

      // Show error message to the user
      Alert.alert('Error', 'Failed to register user. Please try again.');
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

export default RegistrationForm;