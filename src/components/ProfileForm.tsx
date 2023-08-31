
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { updateUserProfile, UserProfileUpdateRequest } from '../apis/ProfileUpdateApi';
import { UserProfileResponse } from '../types/Types';

const ProfileForm: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState<string>(user?.name || '');
  const [contactInfo, setContactInfo] = useState<string>(user?.contactInfo || '');
  const [address, setAddress] = useState<string>(user?.address || '');
  const [profilePicture, setProfilePicture] = useState<string>(user?.profilePicture || '');

  const handleSaveChanges = async () => {
    try {
      // Log: Saving changes to user profile
      console.log('Saving changes to user profile');

      const request: UserProfileUpdateRequest = {
        token: user?.token || '',
        name,
        contactInfo,
        address,
        profilePicture,
      };

      const response = await updateUserProfile(request);

      if (response.success) {
        // Log: Profile update successful
        console.log('Profile update successful');

        const updatedUser: UserProfileResponse = {
          name,
          contactInfo,
          address,
          profilePicture,
          user: user?.user,
        };

        setUser(updatedUser);
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        // Log: Profile update failed
        console.log('Profile update failed');

        Alert.alert('Error', response.message);
      }
    } catch (error) {
      // Log: Error updating profile
      console.error('Error updating profile', error);

      Alert.alert('Error', 'An error occurred while updating the profile');
    }
  };

  return (
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        value={contactInfo}
        onChangeText={setContactInfo}
        placeholder="Contact Info"
      />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
      />
      <TextInput
        value={profilePicture}
        onChangeText={setProfilePicture}
        placeholder="Profile Picture"
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

export default ProfileForm;