
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

interface RegistrationFormProps {
  registerUser: (name: string, email: string, password: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ registerUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log('Registration form submitted');
    if (name && email && password) {
      console.log('Registering user...');
      registerUser(name, email, password);
    } else {
      console.log('Missing required fields');
      Alert.alert('Error', 'Please fill in all required fields');
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegistrationForm;