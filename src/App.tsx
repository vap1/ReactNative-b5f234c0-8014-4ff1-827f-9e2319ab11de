
import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminUserDetailsScreen from './screens/AdminUserDetailsScreen';
import { AuthContext } from './contexts/AuthContext';
import { UserContext } from './contexts/UserContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  const { login } = useContext(AuthContext);

  useEffect(() => {
    console.log('Rendering AuthStack');
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const { userProfile, fetchUserProfile } = useContext(UserContext);

  useEffect(() => {
    console.log('Rendering AppStack');
  }, []);

  useEffect(() => {
    if (userProfile?.user.token) {
      fetchUserProfile(userProfile.user.token);
    }
  }, [userProfile]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen
        name="Admin User Details"
        component={AdminUserDetailsScreen}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    console.log('Rendering App');
  }, []);

  return (
    <NavigationContainer>
      {userToken ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default App;