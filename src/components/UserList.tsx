
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { User } from '../types/Types';
import { getUsers } from '../apis/AdminApi';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      if (response.success) {
        setUsers(response.users);
      } else {
        console.log('Failed to fetch users:', response.message);
      }
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const renderUser = ({ item }: { item: User }) => (
    <View>
      <Text>Name: {item.name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Contact Info: {item.contactInfo}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Profile Picture: {item.profilePicture}</Text>
    </View>
  );

  return (
    <View>
      <Text>User List</Text>
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.email}
      />
    </View>
  );
};

export default UserList;