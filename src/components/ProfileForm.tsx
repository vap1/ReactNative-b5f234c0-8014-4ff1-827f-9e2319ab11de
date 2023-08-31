
import React, { useContext, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { updateUserProfile } from '../apis/ProfileUpdateApi';

const ProfileForm: React.FC = () => {
  const { userProfile, fetchUserProfile } = useContext(UserContext);
  const [name, setName] = useState(userProfile?.user.name || '');
  const [contactInfo, setContactInfo] = useState(userProfile?.user.contactInfo || '');
  const [address, setAddress] = useState(userProfile?.user.address || '');

  const handleProfileUpdate = async () => {
    try {
      // Log the profile update request
      console.log('Profile update request:', { name, contactInfo, address });

      // Make the API call to update the user profile
      const request: UserProfileUpdateRequest = {
        token: userProfile?.user.token || '',
        name,
        contactInfo,
        address,
      };
      const response: UserProfileUpdateResponse = await updateUserProfile(request);

      // Log the profile update response
      console.log('Profile update response:', response);

      // Handle the profile update success or failure
      if (response.success) {
        // Profile update successful
        console.log('User profile update successful');

        // Fetch the updated user profile
        await fetchUserProfile(request.token);
      } else {
        // Profile update failed
        console.log('User profile update failed');
      }
    } catch (error) {
      // Log any errors that occur during profile update
      console.error('Profile update error:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Contact Info"
        value={contactInfo}
        onChangeText={setContactInfo}
      />
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Save" onPress={handleProfileUpdate} />
    </View>
  );
};

export default ProfileForm;