
import React, { useEffect, useContext } from 'react';
import { View, Text, FlatList } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { AdminUserDetailsResponse, User } from '../types/Types';
import { getAdminUserDetails } from '../apis/AdminApi';

const AdminUserDetailsScreen: React.FC = () => {
  const { users, setUsers } = useContext(UserContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response: AdminUserDetailsResponse = await getAdminUserDetails();
        setUsers(response.users);
        console.log('Fetched user details:', response.users);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const renderUserCard = ({ item }: { item: User }) => (
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
      <Text>Admin User Details</Text>
      <FlatList
        data={users}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.email}
      />
    </View>
  );
};

export default AdminUserDetailsScreen;