
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getUsers, User } from '../apis/AdminApi';

const AdminUserDetailsScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users'); // Log: Fetching users

        const response = await getUsers(); // Call the API to get the list of users

        console.log('Users fetched successfully'); // Log: Users fetched successfully

        setUsers(response.users); // Update the state with the fetched users
      } catch (error) {
        console.error('Error fetching users:', error); // Log: Error fetching users
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