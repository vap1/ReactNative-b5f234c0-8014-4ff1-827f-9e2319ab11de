
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminUserDetailsScreen from './screens/AdminUserDetailsScreen';

import { loginUser, UserLoginRequest, UserLoginResponse } from './apis/AuthApi';
import { getUserProfile, UserProfileResponse } from './apis/ProfileApi';
import { getAdminUserDetails, AdminUserDetailsResponse } from './apis/AdminApi';

import { AuthContext } from './contexts/AuthContext';
import { UserContext } from './contexts/UserContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  console.log('Rendering AuthStack...');

  return (
    <Stack.Navigator>
      <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  console.log('Rendering AppStack...');

  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Admin User Details" component={AdminUserDetailsScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  console.log('Rendering App...');

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserProfileResponse | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUsers, setAdminUsers] = useState<UserProfileResponse[]>([]);

  useEffect(() => {
    const handleLogin = async (email: string, password: string) => {
      try {
        setIsLoading(true);
        console.log('Logging in...');
        const request: UserLoginRequest = { email, password };
        const response: UserLoginResponse = await loginUser(request);
        console.log('Login response:', response);
        if (response.success) {
          setIsLoggedIn(true);
          console.log('User logged in successfully!');
        } else {
          console.log('Login failed:', response.message);
        }
      } catch (error) {
        console.log('Error occurred during login:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching user profile...');

        const response: UserProfileResponse = await getUserProfile();
        console.log('User profile fetched:', response);

        setUser(response.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAdminUserDetails = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching admin user details...');

        const response: AdminUserDetailsResponse = await getAdminUserDetails();
        console.log('Admin user details fetched:', response);

        setAdminUsers(response.users);
      } catch (error) {
        console.error('Error fetching admin user details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
    fetchAdminUserDetails();
  }, []);

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ isLoading, isLoggedIn, handleLogin }}>
        <UserContext.Provider value={{ user, loading: isLoading, error: null }}>
          {isLoggedIn ? (
            isAdmin ? (
              <AppStack />
            ) : (
              <ProfileScreen />
            )
          ) : (
            <AuthStack />
          )}
        </UserContext.Provider>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default App;