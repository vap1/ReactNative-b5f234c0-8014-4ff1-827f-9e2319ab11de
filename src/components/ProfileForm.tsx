
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import updateUserProfile from '../apis/ProfileUpdateApi';

const ProfileForm: React.FC = () => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');

  const handleSaveChanges = async () => {
    try {
      console.log('Updating user profile...');
      console.log('Name:', name);
      console.log('Contact Info:', contactInfo);
      console.log('Address:', address);

      const request: UserProfileUpdateRequest = {
        name,
        contactInfo,
        address,
      };

      const response: UserProfileUpdateResponse = await updateUserProfile(request);

      console.log('Response:', response);

      if (response.success) {
        Alert.alert('Success', 'User profile updated successfully');
      } else {
        Alert.alert('Error', 'Failed to update user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      Alert.alert('Error', 'Failed to update user profile');
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
        placeholder="Contact Info"
        value={contactInfo}
        onChangeText={setContactInfo}
      />
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

export default ProfileForm;