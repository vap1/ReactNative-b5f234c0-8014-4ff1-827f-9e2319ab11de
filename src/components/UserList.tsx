
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getAdminUserDetails, User, AdminUserDetailsResponse } from '../types/Types';
import { getUsers } from '../apis/AdminApi';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Log: Fetching admin user details
        console.log('Fetching admin user details');

        // Make API call to get admin user details
        const response: AdminUserDetailsResponse = await getAdminUserDetails();

        // Log: Admin user details fetched successfully
        console.log('Admin user details fetched successfully');

        // Set the users state with the fetched data
        setUsers(response.users);
      } catch (error) {
        // Log: Error fetching admin user details
        console.error('Error fetching admin user details:', error);
      }
    };

    fetchUsers();
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