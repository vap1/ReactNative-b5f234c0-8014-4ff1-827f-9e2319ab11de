
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminUserDetailsScreen from '../screens/AdminUserDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Tab.Navigator>
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Admin User Details" component={AdminUserDetailsScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const isLoggedIn = false; // Check if the user is logged in
  const isAdmin = false; // Check if the user is an admin

  console.log('AppNavigator - Start');

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        isAdmin ? (
          <>
            {console.log('AppNavigator - Admin User')}
            <AppStack />
          </>
        ) : (
          <>
            {console.log('AppNavigator - Logged In User')}
            <ProfileScreen />
          </>
        )
      ) : (
        <>
          {console.log('AppNavigator - Guest User')}
          <AuthStack />
        </>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;