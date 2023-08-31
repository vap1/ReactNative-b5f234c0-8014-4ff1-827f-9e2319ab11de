
import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { getUsers, UserContextProps } from '../apis/AdminApi';

const AdminUserDetailsScreen: React.FC = () => {
  const { users, setUsers }: UserContextProps = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        console.log('API Response:', response);

        if (response.success) {
          setUsers(response.users);
          console.log('Users:', response.users);
        } else {
          console.log('Error:', response.message);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View>
      <Text>Admin User Details</Text>
      {/* Render the list of users */}
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