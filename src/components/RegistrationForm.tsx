
import React, { useState } from 'react';
import { Text, TextInput, Button } from 'react-native';
import { registerUser, UserRegistrationRequest, UserRegistrationResponse } from '../apis/UserApi';
import { useAuthContext } from '../contexts/AuthContext';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuthContext();

  const handleRegistration = async () => {
    console.log('Registration form submitted');
    try {
      const request: UserRegistrationRequest = {
        name,
        email,
        password,
      };

      const response: UserRegistrationResponse = await registerUser(request);
      console.log('Registration API response:', response);

      if (response.success) {
        console.log('Registration successful');
        setToken(response.token);
      } else {
        console.log('Registration failed:', response.message);
      }
    } catch (error) {
      console.log('Registration error:', error.message);
    }
  };

  return (
    <>
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
      <Button title="Register" onPress={handleRegistration} />
    </>
  );
};

export default RegistrationForm;