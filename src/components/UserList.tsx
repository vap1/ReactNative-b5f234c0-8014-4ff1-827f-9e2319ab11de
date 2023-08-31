
import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { AdminUserDetailsResponse } from '../types/Types';
import { getAdminUserDetails } from '../apis/AdminApi';

const UserList: React.FC = () => {
  const { users, setUsers } = useContext(UserContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response: AdminUserDetailsResponse = await getAdminUserDetails();
        console.log('Admin User Details Response:', response);
        if (response.success) {
          setUsers(response.users);
          console.log('Users:', response.users);
        } else {
          console.log('Failed to fetch user details:', response.message);
        }
      } catch (error) {
        console.log('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <View>
      <Text>User List:</Text>
      {users.map((user) => (
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

export default UserList;