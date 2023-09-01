
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { UserProfileRequest, UserProfileResponse, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { getUserProfile, updateUserProfile } from '../apis/ProfileApi';

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log('Fetching user profile...');

        const request: UserProfileRequest = {
          token: 'YOUR_AUTH_TOKEN', // Replace with the actual auth token
        };

        const response: UserProfileResponse = await getUserProfile(request);

        console.log('Response:', response);

        // Update the state with the fetched user profile
        setName(response.user.name);
        setContactInfo(response.user.contactInfo || '');
        setAddress(response.user.address || '');
      } catch (error) {
        console.error('Error fetching user profile:', error);
        console.log('Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      console.log('Updating user profile...');
      console.log('Name:', name);
      console.log('Contact Info:', contactInfo);
      console.log('Address:', address);

      const request: UserProfileUpdateRequest = {
        token: 'YOUR_AUTH_TOKEN', // Replace with the actual auth token
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
      <Button title="Save" onPress={handleSave} disabled={loading} />
    </View>
  );
};

export default ProfileScreen;