
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { UserProfileResponse, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { updateUserProfile } from '../apis/ProfileUpdateApi';

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    console.log('Fetching user profile...');
    setIsLoading(true);
    setIsError(false);

    const fetchUserProfile = async () => {
      try {
        // Simulate API call and generate random data
        const userProfile: UserProfileResponse = {
          user: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            contactInfo: '1234567890',
            address: '123 Main St',
            profilePicture: 'https://example.com/profile.jpg',
          },
        };

        setUserProfile(userProfile);
        setIsLoading(false);
        console.log('User profile fetched successfully:', userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSaveChanges = async () => {
    console.log('Saving changes...');
    setIsLoading(true);
    setIsError(false);

    try {
      // Prepare request payload
      const request: UserProfileUpdateRequest = {
        token: 'your-auth-token',
        name,
        contactInfo,
        address,
        profilePicture,
      };

      // Update user profile
      const response: UserProfileUpdateResponse = await updateUserProfile(request);

      setSuccessMessage(response.message);
      setIsLoading(false);
      console.log('Changes saved successfully:', response);
    } catch (error) {
      console.error('Error updating user profile:', error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : isError ? (
        <Text>Error occurred while fetching user profile.</Text>
      ) : (
        <>
          <Text>Name:</Text>
          <TextInput value={name} onChangeText={setName} />

          <Text>Contact Info:</Text>
          <TextInput value={contactInfo} onChangeText={setContactInfo} />

          <Text>Address:</Text>
          <TextInput value={address} onChangeText={setAddress} />

          <Text>Profile Picture:</Text>
          <TextInput value={profilePicture} onChangeText={setProfilePicture} />

          <Button title="Save Changes" onPress={handleSaveChanges} />

          {successMessage && <Text>{successMessage}</Text>}
        </>
      )}
    </View>
  );
};

export default ProfileScreen;