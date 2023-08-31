
import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { UserContext, User } from '../contexts/UserContext';
import { getUsers, UserContextProps } from '../apis/AdminApi';

const UserList: React.FC = () => {
  const { users, setUsers }: UserContextProps = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getUsers();
        console.log('API Response:', response);
        if (response.success) {
          setUsers(response.users);
          console.log('Users:', response.users);
        } else {
          console.log('Error:', response.message);
        }
      } catch (error) {
        console.log('Error:', error.message);
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
        <View>
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
      )}
    </View>
  );
};

export default UserList;