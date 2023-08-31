
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { UserContext, UserProfileResponse, UserProfileUpdateRequest, updateUserProfile } from '../contexts/UserContext';

const ProfileScreen: React.FC = () => {
  const { user, setUser, getUserProfile } = useContext(UserContext);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    console.log('Fetching user profile...');
    getUserProfile()
      .then((response: UserProfileResponse) => {
        console.log('User profile fetched:', response);
        if (response) {
          setName(response.name);
          setContactInfo(response.contactInfo);
          setAddress(response.address);
        }
      })
      .catch((error: Error) => {
        console.log('Error fetching user profile:', error.message);
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
      .then((response: boolean) => {
        console.log('Profile update response:', response);
        if (response) {
          console.log('Changes saved successfully.');
          // Update the user context with the updated profile
          setUser((prevUser: UserProfileResponse | null) => ({
            ...prevUser,
            name,
            contactInfo,
            address,
          }));
        }
      })
      .catch((error: Error) => {
        console.log('Error saving changes:', error.message);
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