
import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { AdminUserDetailsRequest, AdminUserDetailsResponse } from '../types/Types';
import { getAdminUserDetails } from '../apis/AdminApi';

const AdminUserDetailsScreen: React.FC = () => {
  const { users, setUsers } = useContext(UserContext);

  useEffect(() => {
    const fetchAdminUserDetails = async () => {
      try {
        // Step 1: Create the request object
        const request: AdminUserDetailsRequest = {
          token: 'your_admin_token',
        };

        // Step 2: Make the API call to get admin user details
        const response: AdminUserDetailsResponse = await getAdminUserDetails(request);

        // Step 3: Update the user context with the received user details
        setUsers(response.users);

        console.log('Admin User Details:', response.users);
      } catch (error) {
        console.error('Error fetching admin user details:', error);
      }
    };

    fetchAdminUserDetails();
  }, []);

  return (
    <View>
      <Text>Admin User Details:</Text>
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