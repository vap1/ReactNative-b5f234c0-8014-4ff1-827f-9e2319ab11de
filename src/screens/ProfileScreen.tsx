
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { getUserProfile, UserProfileRequest, UserProfileResponse } from '../apis/ProfileApi';
import { updateUserProfile, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../apis/ProfileUpdateApi';
import { useUserContext } from '../contexts/UserContext';
import { User } from '../types/Types';

const ProfileScreen = () => {
  const { user, setUser } = useUserContext();
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Log: Fetching user profile
      console.log('Fetching user profile');

      // Prepare the request payload
      const request: UserProfileRequest = {
        token: user.token,
      };

      try {
        // Make the API call to get the user profile
        const response: UserProfileResponse = await getUserProfile(request);

        // Log: User profile fetched successfully
        console.log('User profile fetched successfully');

        // Update the user context with the fetched profile
        setUser(response.user);

        // Set the form fields with the fetched profile data
        setName(response.user.name);
        setContactInfo(response.user.contactInfo || '');
        setAddress(response.user.address || '');
        setProfilePicture(response.user.profilePicture || '');
      } catch (error) {
        // Log: Error fetching user profile
        console.error('Error fetching user profile:', error);

        // Display an error message to the user
        alert('An error occurred while fetching the user profile');
      }
    };

    fetchUserProfile();
  }, [user.token, setUser]);

  const handleSaveProfile = async () => {
    // Log: Updating user profile
    console.log('Updating user profile');

    // Prepare the request payload
    const request: UserProfileUpdateRequest = {
      token: user.token,
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

export default ProfileScreen;