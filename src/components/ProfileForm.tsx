
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { updateUserProfile } from '../apis/ProfileUpdateApi';
import { UserContext, UserContextProps } from '../contexts/UserContext';
import { UserProfileResponse } from '../types/Types';

const ProfileForm: React.FC = () => {
  const { user, setUser } = useContext<UserContextProps>(UserContext);
  const [name, setName] = useState<string>(user?.name || '');
  const [contactInfo, setContactInfo] = useState<string>(user?.contactInfo || '');
  const [address, setAddress] = useState<string>(user?.address || '');

  const handleSaveChanges = async () => {
    try {
      // Log: Saving profile changes
      console.log('Saving profile changes');

      const updatedProfile = await updateUserProfile({
        token: user?.token || '',
        name,
        contactInfo,
        address,
      });

      if (updatedProfile.success) {
        // Log: Profile changes saved successfully
        console.log('Profile changes saved successfully');

        // Update the user context with the updated profile
        setUser(updatedProfile.user);
      } else {
        // Log: Failed to save profile changes
        console.log('Failed to save profile changes');
      }
    } catch (error) {
      // Log: Error while saving profile changes
      console.error('Error while saving profile changes:', error);
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

      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

export default ProfileForm;