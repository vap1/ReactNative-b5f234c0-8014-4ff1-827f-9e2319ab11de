
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { updateUserProfile, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../apis/ProfileUpdateApi';
import { User, UserProfileResponse } from '../types/Types';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const handleSaveProfile = async () => {
    // Log: Updating user profile
    console.log('Updating user profile');

    // Prepare the request payload
    const request: UserProfileUpdateRequest = {
      name,
      contactInfo,
      address,
      profilePicture,
    };

    try {
      // Make the API call to update the user profile
      const response: UserProfileUpdateResponse = await updateUserProfile(request);

      // Log: User profile updated successfully
      console.log('User profile updated successfully');

      // Handle the response
      if (response.success) {
        // Log: Profile update success message
        console.log('Profile update success message:', response.message);

        // Display a success message to the user
        alert('Profile updated successfully');
      } else {
        // Log: Profile update error message
        console.log('Profile update error message:', response.message);

        // Display an error message to the user
        alert('Failed to update profile');
      }
    } catch (error) {
      // Log: Profile update error
      console.error('Profile update error:', error);

      // Display an error message to the user
      alert('An error occurred while updating the profile');
    }
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} />

      <Text>Contact Info:</Text>
      <TextInput value={contactInfo} onChangeText={setContactInfo} />

      <Text>Address:</Text>
      <TextInput value={address} onChangeText={setAddress} />

      <Text>Profile Picture:</Text>
      <TextInput value={profilePicture} onChangeText={setProfilePicture} />

      <Button title="Save" onPress={handleSaveProfile} />
    </View>
  );
};

export default ProfileForm;