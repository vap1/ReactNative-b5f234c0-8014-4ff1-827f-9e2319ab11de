
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getAdminUserDetails, User, AdminUserDetailsResponse } from '../types/Types';
import { getUsers } from '../apis/AdminApi';

const AdminUserDetailsScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching admin user details'); // Log: Fetching admin user details

        const response: AdminUserDetailsResponse = await getAdminUserDetails(); // Make API call to get admin user details

        console.log('Admin user details fetched successfully'); // Log: Admin user details fetched successfully

        setUsers(response.users); // Set the users state with the fetched data
      } catch (error) {
        console.error('Error fetching admin user details:', error); // Log: Error fetching admin user details
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

export default AdminUserDetailsScreen;