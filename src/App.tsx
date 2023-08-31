
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuthContext } from './contexts/AuthContext';
import { useUserContext } from './contexts/UserContext';
import { AppNavigator } from './navigation/AppNavigator';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  const { isLoggedIn, checkLoginStatus } = useAuthContext();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const { isAdmin } = useUserContext();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {isAdmin && <Tab.Screen name="Admin User Details" component={AdminUserDetailsScreen} />}
    </Tab.Navigator>
  );
};

const App = () => {
  const { isLoggedIn, isAdmin } = useAuthContext();

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