
import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { UserContext, UserContextProps } from '../contexts/UserContext';
import { getUsers, User } from '../apis/AdminApi';

const UserList: React.FC = () => {
  const { users, getUsers }: UserContextProps = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        console.log('Fetched users:', response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View>
      <Text>User List:</Text>
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

export default UserList;