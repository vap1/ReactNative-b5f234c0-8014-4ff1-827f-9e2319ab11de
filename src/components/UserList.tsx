
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { UserContext, User } from '../contexts/UserContext';
import { getUsers, UserContextProps } from '../apis/AdminApi';

const UserList: React.FC = () => {
  const { users, getUsers } = useContext<UserContextProps>(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await getUsers();
        console.log('User List:', response.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item: User) => item.email}
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