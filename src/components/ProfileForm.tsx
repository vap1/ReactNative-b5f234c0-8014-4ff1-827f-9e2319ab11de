
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { UserContext, UserProfileUpdateRequest } from '../contexts/UserContext';
import { updateUserProfile } from '../apis/ProfileUpdateApi';

const ProfileForm: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState<string>(user?.name || '');
  const [contactInfo, setContactInfo] = useState<string>(user?.contactInfo || '');
  const [address, setAddress] = useState<string>(user?.address || '');
  const [profilePicture, setProfilePicture] = useState<string>(user?.profilePicture || '');

  const handleSaveChanges = async () => {
    try {
      const request: UserProfileUpdateRequest = {
        token: user?.token || '',
        name,
        contactInfo,
        address,
        profilePicture,
      };

      const response = await updateUserProfile(request);
      if (response.success) {
        setUser({ ...user, name, contactInfo, address, profilePicture });
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

export default ProfileForm;