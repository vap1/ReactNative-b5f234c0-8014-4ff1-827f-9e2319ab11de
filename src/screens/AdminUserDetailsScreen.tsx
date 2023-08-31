
import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { UserContext, User, AdminUserDetailsRequest } from '../contexts/UserContext';
import { getUsers, UserContextProps } from '../apis/AdminApi';

const AdminUserDetailsScreen: React.FC = () => {
  const { users, getUsers } = useContext<UserContextProps>(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const request: AdminUserDetailsRequest = {
          token: 'your_admin_token_here',
        };
        const response = await getUsers(request);
        console.log('User Details:', response.users);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUsers();
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