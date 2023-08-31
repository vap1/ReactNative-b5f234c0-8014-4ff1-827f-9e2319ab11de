
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { registerUser, UserRegistrationRequest, UserRegistrationResponse } from '../apis/UserApi';
import { useAuthContext } from '../contexts/AuthContext';

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuthContext();

  const handleRegistration = async () => {
    console.log('Registration initiated');
    try {
      const request: UserRegistrationRequest = {
        name,
        email,
        password,
      };

      const response: UserRegistrationResponse = await registerUser(request);
      console.log('Registration response:', response);

      if (response.success) {
        console.log('Registration successful');
        // Automatically log in the user after successful registration
        await loginUser(email, password);
      } else {
        console.log('Registration failed:', response.message);
      }
    } catch (error) {
      console.log('Registration error:', error);
    }
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
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

export default RegistrationScreen;