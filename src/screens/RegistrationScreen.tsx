
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';
import registerUser from '../apis/UserApi';

const RegistrationScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      console.log('Registering user...');
      const request: UserRegistrationRequest = {
        name,
        email,
        password,
      };

      const response: UserRegistrationResponse = await registerUser(request);
      console.log('Registration response:', response);

      if (response.success) {
        Alert.alert('Success', response.message);
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      console.log('Error occurred during user registration:', error);
      Alert.alert('Error', 'An error occurred during registration. Please try again.');
    }
  };

  console.log('Rendering RegistrationScreen...');

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