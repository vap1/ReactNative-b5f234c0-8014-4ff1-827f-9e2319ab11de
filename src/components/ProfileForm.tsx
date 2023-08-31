
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { updateProfile } from '../apis/ProfileUpdateApi';
import { UserProfileUpdateRequest } from '../types/Types';

const ProfileForm: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [contactInfo, setContactInfo] = useState(user.contactInfo);
  const [address, setAddress] = useState(user.address);

  const handleSaveChanges = async () => {
    try {
      // Step 1: Create the request object
      const request: UserProfileUpdateRequest = {
        token: user.token,
        name,
        contactInfo,
        address,
      };

      // Step 2: Send the API request to update the user profile
      const response = await updateProfile(request);

      // Step 3: Handle the API response
      if (response.success) {
        // Step 4: Update the user context with the updated profile information
        setUser({
          ...user,
          name,
          contactInfo,
          address,
        });

        // Step 5: Show a success message
        Alert.alert('Success', response.message);
      } else {
        // Step 6: Show an error message
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      // Step 7: Handle any errors
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An error occurred while updating the profile.');
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