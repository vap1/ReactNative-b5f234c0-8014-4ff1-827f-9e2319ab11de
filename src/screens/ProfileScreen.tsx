
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useUserContext } from '../contexts/UserContext';
import { getUserProfile, updateUserProfile, UserProfileResponse, UserProfileUpdateRequest } from '../apis/ProfileApi';
import { User } from '../types/Types';

const ProfileScreen: React.FC = () => {
  const { user, setUser } = useUserContext();
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    // Fetch user profile on component mount
    getUserProfile()
      .then((response: UserProfileResponse) => {
        console.log('User profile fetched:', response);
        setUser(response.user);
        setName(response.user.name);
        setContactInfo(response.user.contactInfo);
        setAddress(response.user.address);
        setProfilePicture(response.user.profilePicture);
      })
      .catch((error: any) => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  const handleSaveChanges = () => {
    const updatedProfile: UserProfileUpdateRequest = {
      name,
      contactInfo,
      address,
      profilePicture,
    };

    updateUserProfile(updatedProfile)
      .then((response) => {
        console.log('User profile updated:', response);
        setUser({ ...user, ...updatedProfile });
      })
      .catch((error: any) => {
        console.error('Error updating user profile:', error);
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

      <Text>Profile Picture:</Text>
      <TextInput value={profilePicture} onChangeText={setProfilePicture} />

      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

export default ProfileScreen;