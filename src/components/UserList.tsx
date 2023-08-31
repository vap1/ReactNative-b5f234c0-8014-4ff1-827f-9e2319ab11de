
import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../contexts/UserContext';

const UserList: React.FC = () => {
  const { users, getUsers } = useContext(UserContext);

  useEffect(() => {
    console.log('Fetching user list...');
    getUsers();
  }, []);

  console.log('Rendering user list...');
  return (
    <View>
      <Text>User List:</Text>
      {users.map((user: any) => (
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