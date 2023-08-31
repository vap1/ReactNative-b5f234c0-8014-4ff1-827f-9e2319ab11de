
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { UserContext, UserProfileUpdateRequest } from '../contexts/UserContext';
import { updateUserProfile } from '../apis/ProfileUpdateApi';

const ProfileForm: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [contactInfo, setContactInfo] = useState(user.contactInfo);
  const [address, setAddress] = useState(user.address);

  const handleSaveChanges = async () => {
    try {
      const request: UserProfileUpdateRequest = {
        token: user.token,
        name,
        contactInfo,
        address,
      };

      const response = await updateUserProfile(request);
      if (response.success) {
        setUser({ ...user, name, contactInfo, address });
        Alert.alert('Success', response.message);
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      Alert.alert('Error', 'Failed to update user profile. Please try again.');
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