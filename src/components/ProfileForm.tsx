
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { UserContext, UserProfileUpdateRequest } from '../contexts/UserContext';
import { updateUserProfile } from '../apis/ProfileUpdateApi';

const ProfileForm: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [contactInfo, setContactInfo] = useState(user.contactInfo);
  const [address, setAddress] = useState(user.address);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);

  const handleSaveChanges = async () => {
    try {
      // Log: Saving profile changes
      console.log('Saving profile changes...');

      const request: UserProfileUpdateRequest = {
        name,
        contactInfo,
        address,
        profilePicture,
      };

      const response = await updateUserProfile(request);

      if (response.success) {
        // Log: Profile changes saved successfully
        console.log('Profile changes saved successfully.');

        // Update the user context with the updated profile
        setUser(response.user);

        // Show success message to the user
        Alert.alert('Success', 'Profile changes saved successfully.');
      } else {
        // Log: Failed to save profile changes
        console.log('Failed to save profile changes.');

        // Show error message to the user
        Alert.alert('Error', 'Failed to save profile changes. Please try again.');
      }
    } catch (error) {
      // Log: Error while saving profile changes
      console.error('Error while saving profile changes:', error);

      // Show error message to the user
      Alert.alert('Error', 'An error occurred while saving profile changes. Please try again.');
    }
  };

  return (
    <View>
      {/* Log: Rendering profile form */}
      {console.log('Rendering profile form...')}

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