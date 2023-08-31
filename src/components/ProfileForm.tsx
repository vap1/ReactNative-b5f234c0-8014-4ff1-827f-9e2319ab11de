
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { updateUserProfile, UserProfileUpdateRequest } from '../apis/ProfileUpdateApi';
import { UserContext } from '../contexts/UserContext';
import { User } from '../types/Types';

const ProfileForm: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState<string>(user.name);
  const [contactInfo, setContactInfo] = useState<string>(user.contactInfo);
  const [address, setAddress] = useState<string>(user.address);

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
        const updatedUser: User = {
          ...user,
          name,
          contactInfo,
          address,
        };
        setUser(updatedUser);

        Alert.alert('Success', response.message);
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      Alert.alert('Error', 'Failed to update user profile. Please try again later.');
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
      <Button title="Save Changes" onPress={handleSaveChanges} />
    </View>
  );
};

export default ProfileForm;