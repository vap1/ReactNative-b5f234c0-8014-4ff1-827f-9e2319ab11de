
import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../contexts/UserContext';

const ProfileScreen: React.FC = () => {
  const { user, getUserProfile } = useContext(UserContext);

  useEffect(() => {
    console.log('Fetching user profile...');
    getUserProfile();
  }, []);

  if (!user) {
    console.log('User profile not available.');
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log('User profile:', user);

  return (
    <View>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Contact Info: {user.contactInfo}</Text>
      <Text>Address: {user.address}</Text>
      <Text>Profile Picture: {user.profilePicture}</Text>
    </View>
  );
};

export default ProfileScreen;