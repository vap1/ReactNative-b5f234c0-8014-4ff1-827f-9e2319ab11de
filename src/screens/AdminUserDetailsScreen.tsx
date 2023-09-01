
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getAdminUserDetails, AdminUserDetailsResponse, User } from '../apis/AdminApi';

const AdminUserDetailsScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAdminUserDetails = async () => {
      try {
        console.log('Fetching admin user details...'); // Log: Fetching admin user details

        const response: AdminUserDetailsResponse = await getAdminUserDetails();

        console.log('Admin user details fetched successfully:', response.users); // Log: Admin user details fetched successfully

        setUsers(response.users);
      } catch (error) {
        console.error('Error fetching admin user details:', error); // Log: Error fetching admin user details
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

export default AdminUserDetailsScreen;