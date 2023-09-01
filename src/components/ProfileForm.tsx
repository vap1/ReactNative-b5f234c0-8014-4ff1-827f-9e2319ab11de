
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import updateUserProfile from '../apis/ProfileUpdateApi';

const ProfileForm: React.FC = () => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = async () => {
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

      // Handle success or failure based on the response
      if (response.success) {
        console.log('User profile updated successfully');
      } else {
        console.log('Failed to update user profile:', response.message);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      console.log('Failed to update user profile');
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
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default ProfileForm;