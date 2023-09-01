
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { UserProfileRequest, UserProfileResponse, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { getUserProfile, updateUserProfile } from '../apis/ProfileApi';

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log('Fetching user profile...');

        const request: UserProfileRequest = {
          token: 'YOUR_AUTH_TOKEN', // Replace with the actual auth token
        };

        const response: UserProfileResponse = await getUserProfile(request);

        console.log('Response:', response);

        if (response.user) {
          setName(response.user.name);
          setContactInfo(response.user.contactInfo || '');
          setAddress(response.user.address || '');
        } else {
          Alert.alert('Error', 'Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        Alert.alert('Error', 'Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleSaveChanges = async () => {
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

export default ProfileScreen;