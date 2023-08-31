
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { registerUser, UserRegistrationRequest, UserRegistrationResponse } from '../apis/UserApi';
import { useAuthContext } from '../contexts/AuthContext';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuthContext();

  const handleRegistration = async () => {
    try {
      // Step 1: User enters their name, email, and password
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Password:', password);

      // Step 2: User submits the registration form
      console.log('Submitting registration form...');

      const registrationRequest: UserRegistrationRequest = {
        name,
        email,
        password,
      };

      const registrationResponse: UserRegistrationResponse = await registerUser(registrationRequest);

      // Step 3: Outcomes
      if (registrationResponse.success) {
        console.log('Registration successful:', registrationResponse.message);
        loginUser(email, password); // Automatically log in the user after registration
      } else {
        console.log('Registration failed:', registrationResponse.message);
        Alert.alert('Registration Failed', registrationResponse.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'An error occurred during registration. Please try again later.');
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