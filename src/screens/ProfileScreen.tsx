
import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { useUserContext } from '../contexts/UserContext';
import { getUserProfile, UserProfileResponse } from '../apis/ProfileApi';

const ProfileScreen: React.FC = () => {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    console.log('Fetching user profile...');
    getUserProfile()
      .then((response: UserProfileResponse) => {
        console.log('User profile fetched successfully:', response);
        setUser(response.user);
      })
      .catch((error: Error) => {
        console.log('Error fetching user profile:', error);
      });
  }, []);

  return (
    <View>
      <Text>Name: {user?.name}</Text>
      <Text>Contact Info: {user?.contactInfo}</Text>
      <Text>Address: {user?.address}</Text>
      <Text>Profile Picture: {user?.profilePicture}</Text>
    </View>
  );
};

export default ProfileScreen;