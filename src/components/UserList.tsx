
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { UserContext, User } from '../contexts/UserContext';
import { getUsers, UserContextProps } from '../apis/AdminApi';

const UserList: React.FC = () => {
  const { users, getUsers } = useContext<UserContextProps>(UserContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getUsers();
        console.log('User List API Response:', response);
      } catch (error) {
        console.error('Error fetching user list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(user: User) => user.email}
          renderItem={({ item }: { item: User }) => (
            <View>
              <Text>Name: {item.name}</Text>
              <Text>Email: {item.email}</Text>
              <Text>Contact Info: {item.contactInfo}</Text>
              <Text>Address: {item.address}</Text>
              <Text>Profile Picture: {item.profilePicture}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default UserList;