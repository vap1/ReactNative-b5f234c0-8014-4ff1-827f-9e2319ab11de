
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
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

        // Update the user context with the updated profile
        setUser((prevUser) => ({
          ...prevUser,
          name,
          contactInfo,
          address,
          profilePicture,
        }));
      } else {
        // Log: Profile update failed
        console.log('Profile update failed');
      }
    } catch (error) {
      // Log: Error while updating profile
      console.error('Error while updating profile:', error);
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
      <Image
        source={{ uri: profilePicture }}
        style={{ width: 100, height: 100 }}
      />
      <Button
        title="Save Changes"
        onPress={handleSaveChanges}
      />
    </View>
  );
};

export default ProfileForm;