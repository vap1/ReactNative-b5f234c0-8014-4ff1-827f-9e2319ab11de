
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getAdminUserDetails, AdminUserDetailsResponse, User } from '../apis/AdminApi';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAdminUserDetails = async () => {
      try {
        // Log: UserList - fetchAdminUserDetails - Fetching admin user details
        console.log('Fetching admin user details...');

        // Call the API to get admin user details
        const response: AdminUserDetailsResponse = await getAdminUserDetails();

        // Log: UserList - fetchAdminUserDetails - Admin user details fetched successfully
        console.log('Admin user details fetched successfully:', response.users);

        // Update the state with the fetched user details
        setUsers(response.users);
      } catch (error) {
        // Log: UserList - fetchAdminUserDetails - Error fetching admin user details
        console.error('Error fetching admin user details:', error);
      }
    };

    fetchAdminUserDetails();
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