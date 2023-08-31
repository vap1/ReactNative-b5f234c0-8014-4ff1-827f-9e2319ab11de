
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { User } from '../types/Types';
import { getAdminUserDetails } from '../apis/AdminApi';

const AdminUserDetailsScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Log the admin user details request
        console.log('Admin user details request');

        // Make the API call to get admin user details
        const response = await getAdminUserDetails();

        // Log the admin user details response
        console.log('Admin user details response:', response);

        // Update the users state with the fetched user details
        setUsers(response.users);
      } catch (error) {
        // Log any errors that occur during fetching admin user details
        console.error('Admin user details error:', error);
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

export default AdminUserDetailsScreen;