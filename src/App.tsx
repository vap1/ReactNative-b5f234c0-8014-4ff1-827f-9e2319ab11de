
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Checking login status'); // Log: Checking login status

    // Check if the user is already logged in
    const checkLoggedInStatus = async () => {
      try {
        // Make an API call to check if the user is logged in
        // Replace {} with the appropriate request parameters
        const response = await loginUser({});

        // Check the response and update the isLoggedIn state accordingly
        if (response.success) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedInStatus();
  }, []);

  console.log('Rendering AppNavigator'); // Log: Rendering AppNavigator

  return (
    <NavigationContainer>
      {isLoading ? (
        <LoadingScreen />
      ) : isLoggedIn ? (
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