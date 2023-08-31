
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { UserProfileRequest, UserProfileResponse } from '../types/Types';

const ProfileScreen: React.FC = () => {
  const { getUserProfile } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Step 1: User logs in to their account.
        console.log('Step 1: User logs in to their account.');

        // Step 2: Fetch user profile from the API.
        console.log('Step 2: Fetch user profile from the API.');
        const userProfileRequest: UserProfileRequest = {
          token: 'user_token', // Replace with the actual user token
        };
        const userProfileResponse = await getUserProfile(userProfileRequest);

        // Step 3: Update the user profile state.
        console.log('Step 3: Update the user profile state.');
        setUserProfile(userProfileResponse);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <View>
      <Text>Profile Screen</Text>
      {userProfile ? (
        <View>
          <Text>Name: {userProfile.user.name}</Text>
          <Text>Email: {userProfile.user.email}</Text>
          <Text>Contact Info: {userProfile.user.contactInfo}</Text>
          <Text>Address: {userProfile.user.address}</Text>
          <Text>Profile Picture: {userProfile.user.profilePicture}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button title="Edit Profile" onPress={() => console.log('Edit Profile button pressed')} />
    </View>
  );
};

export default ProfileScreen;