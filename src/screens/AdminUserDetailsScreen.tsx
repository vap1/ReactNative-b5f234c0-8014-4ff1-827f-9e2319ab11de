
import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { getUsers, User } from '../apis/AdminApi';

const AdminUserDetailsScreen: React.FC = () => {
  const { users, getUsers } = useContext(UserContext);

  useEffect(() => {
    console.log('Fetching user details...');
    getUsers()
      .then((response: User[]) => {
        console.log('User details fetched successfully:', response);
      })
      .catch((error: Error) => {
        console.log('Error fetching user details:', error);
      });
  }, []);

  return (
    <View>
      <Text>Admin User Details</Text>
      {users.map((user: User) => (
        <View key={user.email}>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Contact Info: {user.contactInfo}</Text>
          <Text>Address: {user.address}</Text>
          <Text>Profile Picture: {user.profilePicture}</Text>
        </View>
      ))}
    </View>
  );
};

export default AdminUserDetailsScreen;