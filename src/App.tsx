
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminUserDetailsScreen from './screens/AdminUserDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  useEffect(() => {
    console.log('Rendering AuthStack'); // Log: Rendering AuthStack
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  useEffect(() => {
    console.log('Rendering AppStack'); // Log: Rendering AppStack
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Admin User Details" component={AdminUserDetailsScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Check if the user is logged in
  const [isAdmin, setIsAdmin] = useState(false); // Check if the user is an admin

  useEffect(() => {
    console.log('Checking user login status'); // Log: Checking user login status

    // Perform login status check here (e.g., check if user is logged in and if they are an admin)
    // Set the values of isLoggedIn and isAdmin accordingly

    setIsLoggedIn(true); // Placeholder value for demonstration
    setIsAdmin(false); // Placeholder value for demonstration
  }, []);

  useEffect(() => {
    console.log('Rendering AppNavigator'); // Log: Rendering AppNavigator
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        isAdmin ? (
          <AppStack />
        ) : (
          <ProfileScreen />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default App;