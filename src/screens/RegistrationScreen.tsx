
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { registerUser, UserRegistrationRequest, UserRegistrationResponse } from '../apis/UserApi';
import { useAuthContext } from '../contexts/AuthContext';

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginUser } = useAuthContext();

  const handleRegistration = async () => {
    try {
      setLoading(true);
      setError('');

      // Create the registration request object
      const registrationRequest: UserRegistrationRequest = {
        name,
        email,
        password,
      };

      // Call the registerUser API
      const registrationResponse: UserRegistrationResponse = await registerUser(registrationRequest);

      if (registrationResponse.success) {
        // Registration successful, log in the user
        await loginUser(email, password);
      } else {
        setError(registrationResponse.message);
      }
    } catch (error) {
      setError('An error occurred during registration.');
    } finally {
      setLoading(false);
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

      {error ? <Text>{error}</Text> : null}

      <Button
        title={loading ? 'Loading...' : 'Register'}
        onPress={handleRegistration}
        disabled={loading}
      />
    </View>
  );
};

export default RegistrationScreen;