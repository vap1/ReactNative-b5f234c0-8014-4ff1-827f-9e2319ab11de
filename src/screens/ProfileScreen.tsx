
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { UserContext, UserProfileUpdateRequest, UserProfileResponse } from '../contexts/UserContext';
import { updateUserProfile } from '../apis/ProfileUpdateApi';

const ProfileScreen: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setContactInfo(user.contactInfo || '');
      setAddress(user.address || '');
    }
  }, [user]);

  const handleSaveChanges = async () => {
    console.log('Saving changes...');
    const request: UserProfileUpdateRequest = {
      token: user?.token || '',
      name,
      contactInfo,
      address,
    };

    try {
      const response = await updateUserProfile(request);
      console.log('Profile update response:', response);

      if (response.success) {
        console.log('Profile updated successfully');
        const updatedUser: UserProfileResponse = {
          ...user,
          name,
          contactInfo,
          address,
        };
        setUser(updatedUser);
      } else {
        console.log('Profile update failed:', response.message);
      }
    } catch (error) {
      console.log('Profile update error:', error);
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

export default ProfileScreen;