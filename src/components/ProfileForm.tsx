
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { updateUserProfile, UserProfileUpdateRequest } from '../apis/ProfileUpdateApi';
import { User } from '../types/Types';

const ProfileForm: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [contactInfo, setContactInfo] = useState(user.contactInfo);
  const [address, setAddress] = useState(user.address);

  const handleSaveChanges = async () => {
    try {
      // Prepare the request payload
      const request: UserProfileUpdateRequest = {
        token: user.token,
        name,
        contactInfo,
        address,
      };

      // Make the API call to update the user profile
      const response = await updateUserProfile(request);

      if (response.success) {
        // Update the user context with the updated profile
        setUser({
          ...user,
          name,
          contactInfo,
          address,
        });

        console.log('Profile updated successfully');
      } else {
        console.log('Failed to update profile:', response.message);
      }
    } catch (error) {
      console.log('Error updating profile:', error.message);
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