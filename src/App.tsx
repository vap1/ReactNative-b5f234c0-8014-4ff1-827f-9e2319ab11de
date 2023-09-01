
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminUserDetailsScreen from './screens/AdminUserDetailsScreen';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { UserProvider, useUser } from './contexts/UserContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  console.log('Rendering AuthStack'); // Log: Rendering AuthStack

  return (
    <Stack.Navigator>
      <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  console.log('Rendering AppStack'); // Log: Rendering AppStack

  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Admin User Details" component={AdminUserDetailsScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  console.log('Rendering App'); // Log: Rendering App

  const { user, loading, handleLogin, handleLogout } = useAuth();
  const { getUserProfile } = useUser();

  useEffect(() => {
    console.log('Fetching user profile...'); // Log: Fetching user profile...

    if (user) {
      getUserProfile(user.token);
    }
  }, [user, getUserProfile]);

  const isLoggedIn = !!user;
  const isAdmin = user?.isAdmin;

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        isAdmin ? <AppStack /> : <ProfileScreen />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

const AppWithProviders = () => {
  console.log('Rendering AppWithProviders'); // Log: Rendering AppWithProviders

  return (
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  );
};

export default AppWithProviders;