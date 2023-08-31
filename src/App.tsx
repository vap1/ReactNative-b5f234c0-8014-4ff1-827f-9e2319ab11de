
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminUserDetailsScreen from './screens/AdminUserDetailsScreen';

import { useAuthContext } from './contexts/AuthContext';
import { useUserContext } from './contexts/UserContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    console.log('AuthStack - useEffect - isLoggedIn:', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const { isLoggedIn, isAdmin } = useAuthContext();
  const { getUserProfile } = useUserContext();

  useEffect(() => {
    console.log('AppStack - useEffect - isLoggedIn:', isLoggedIn);
    console.log('AppStack - useEffect - isAdmin:', isAdmin);
  }, [isLoggedIn, isAdmin]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserProfile();
    }
  }, [isLoggedIn, getUserProfile]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {isAdmin && <Tab.Screen name="Admin User Details" component={AdminUserDetailsScreen} />}
    </Tab.Navigator>
  );
};

const App = () => {
  const { isLoggedIn, isAdmin } = useAuthContext();

  useEffect(() => {
    console.log('App - useEffect - isLoggedIn:', isLoggedIn);
    console.log('App - useEffect - isAdmin:', isAdmin);
  }, [isLoggedIn, isAdmin]);

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

export default App;