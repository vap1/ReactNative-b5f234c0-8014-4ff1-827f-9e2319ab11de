
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { UserContext, UserProfileResponse, UserProfileUpdateRequest, updateUserProfile } from '../contexts/UserContext';

const ProfileScreen: React.FC = () => {
  const { user, getUserProfile } = useContext(UserContext);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    console.log('Fetching user profile...');
    getUserProfile()
      .then((response: UserProfileResponse) => {
        console.log('User profile fetched successfully:', response);
        setName(response.user.name);
        setContactInfo(response.user.contactInfo);
        setAddress(response.user.address);
      })
      .catch((error: any) => {
        console.log('Failed to fetch user profile:', error);
      });
  }, []);

  const handleSaveChanges = () => {
    console.log('Saving changes...');
    const updatedProfile: UserProfileUpdateRequest = {
      name,
      contactInfo,
      address,
    };

    updateUserProfile(updatedProfile)
      .then((response: any) => {
        console.log('Profile updated successfully:', response);
      })
      .catch((error: any) => {
        console.log('Failed to update profile:', error);
      });
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} />

      <Text>Contact Info:</Text>
      <TextInput value={contactInfo} onChangeText={setContactInfo} />

      <Text>Address:</Text>
      <TextInput value={address} onChangeText={setAddress} />

      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

export default ProfileScreen;