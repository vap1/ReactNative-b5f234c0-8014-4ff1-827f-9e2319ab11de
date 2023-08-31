
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Button } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { UserProfileResponse, UserProfileUpdateRequest } from '../types/Types';
import { updateUserProfile } from '../apis/ProfileUpdateApi';

const ProfileScreen: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setContactInfo(user.contactInfo || '');
      setAddress(user.address || '');
      setProfilePicture(user.profilePicture || '');
    }
  }, [user]);

  const handleSaveChanges = async () => {
    try {
      const updatedProfile: UserProfileUpdateRequest = {
        name,
        contactInfo,
        address,
        profilePicture,
      };

      const response = await updateUserProfile(updatedProfile);
      if (response.success) {
        setUser((prevUser: UserProfileResponse | null) => ({
          ...prevUser,
          name,
          contactInfo,
          address,
          profilePicture,
        }));
        console.log('Profile updated successfully');
      } else {
        console.log('Failed to update profile:', response.message);
      }
    } catch (error) {
      console.log('Error updating profile:', error);
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

      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

export default ProfileScreen;