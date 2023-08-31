
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { registerUser, UserRegistrationRequest, UserRegistrationResponse } from '../apis/UserApi';
import { useAuthContext } from '../contexts/AuthContext';
import { AuthContextProps } from '../types/Types';

const RegistrationForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuthContext() as AuthContextProps;

  const handleRegistration = async () => {
    console.log('Registration form submitted');
    try {
      const request: UserRegistrationRequest = {
        name,
        email,
        password,
      };

      const response: UserRegistrationResponse = await registerUser(request);
      console.log('Registration response:', response);

      if (response.success) {
        console.log('User registration successful');
        // Perform login after successful registration
        const loginResponse = await loginUser({ email, password });
        console.log('Login response:', loginResponse);

        if (loginResponse.success) {
          console.log('User login successful');
          // Redirect to the profile screen or perform any other necessary actions
        } else {
          console.log('User login failed:', loginResponse.message);
          // Handle login failure
        }
      } else {
        console.log('User registration failed:', response.message);
        // Handle registration failure
      }
    } catch (error) {
      console.log('Error during registration:', error);
      // Handle error during registration
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