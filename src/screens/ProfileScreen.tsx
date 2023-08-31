
import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { UserProfileRequest, UserProfileResponse, User } from '../types/Types';
import { getUserProfile } from '../apis/ProfileApi';

const ProfileScreen: React.FC = () => {
  const { userProfile, fetchUserProfile } = useContext(UserContext);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Log the fetch user profile request
        console.log('Fetch user profile request');

        // Make the API call to fetch user profile
        const request: UserProfileRequest = { token: userProfile?.user.token || '' };
        const response: UserProfileResponse = await getUserProfile(request);

        // Log the fetch user profile response
        console.log('Fetch user profile response:', response);

        // Update the user state with the fetched profile
        setUser(response.user);
      } catch (error) {
        // Log any errors that occur during fetch user profile
        console.error('Fetch user profile error:', error);
      }
    };

    fetchProfile();
  }, [userProfile]);

  return (
    <View>
      <Text>User Profile:</Text>
      {user && (
        <View>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Contact Info: {user.contactInfo}</Text>
          <Text>Address: {user.address}</Text>
          <Text>Profile Picture: {user.profilePicture}</Text>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;