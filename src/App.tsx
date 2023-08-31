
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
  const { login } = useAuthContext();

  useEffect(() => {
    console.log('Rendering RegistrationScreen');
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
        listeners={({ navigation }) => ({
          beforeRemove: (e) => {
            // Prevent going back to the Registration screen after successful login
            e.preventDefault();
            navigation.navigate('Profile');
          },
        })}
        initialParams={{ onLogin: login }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const { isLoggedIn, isAdmin } = useAuthContext();
  const { getUserProfile } = useUserContext();

  useEffect(() => {
    console.log('Rendering ProfileScreen');
    if (isLoggedIn) {
      getUserProfile();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    console.log('Rendering AdminUserDetailsScreen');
    if (isAdmin) {
      // Fetch admin user details
    }
  }, [isAdmin]);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {isAdmin && (
        <Tab.Screen name="Admin User Details" component={AdminUserDetailsScreen} />
      )}
    </Tab.Navigator>
  );
};

const App = () => {
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    console.log('Rendering App');
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default App;