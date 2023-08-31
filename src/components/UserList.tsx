
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { User } from '../types/Types';
import { getAdminUserDetails } from '../apis/AdminApi';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';

const UserList: React.FC = () => {
  const { token } = useContext(AuthContext);
  const { isAdmin } = useContext(UserContext);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAdminUserDetails(token);
        if (response.success) {
          setUsers(response.users);
        } else {
          console.log('Failed to fetch user details:', response.message);
        }
      } catch (error) {
        console.log('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [token, isAdmin]);

  if (!isAdmin) {
    return (
      <View>
        <Text>You are not authorized to view this page.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Contact Info: {item.contactInfo}</Text>
            <Text>Address: {item.address}</Text>
            <Text>Profile Picture: {item.profilePicture}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default UserList;