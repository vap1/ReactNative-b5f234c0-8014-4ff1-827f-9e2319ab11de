
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getUsers, User } from '../apis/AdminApi';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Log: Fetching users
        console.log('Fetching users');

        // Call the API to get the list of users
        const response = await getUsers();

        // Log: Users fetched successfully
        console.log('Users fetched successfully');

        // Update the state with the fetched users
        setUsers(response.users);
      } catch (error) {
        // Log: Error fetching users
        console.error('Error fetching users:', error);
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