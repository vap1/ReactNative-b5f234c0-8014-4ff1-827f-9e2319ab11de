
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { UserProfileRequest, UserProfileResponse } from '../types/Types';
import { getProfile } from '../apis/ProfileApi';

const ProfileScreen: React.FC = () => {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const request: UserProfileRequest = {
        token: user.token,
      };
      const response = await getProfile(request);
      setProfile(response);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      {profile ? (
        <>
          <Image source={{ uri: profile.user.profilePicture }} style={styles.profilePicture} />
          <Text>Name: {profile.user.name}</Text>
          <Text>Email: {profile.user.email}</Text>
          <Text>Contact Info: {profile.user.contactInfo}</Text>
          <Text>Address: {profile.user.address}</Text>
        </>
      ) : (
        <Text>Loading profile...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default ProfileScreen;