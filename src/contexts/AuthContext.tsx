
import React, { createContext, useState, useEffect } from 'react';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { AuthContextProps } from '../types/Types';

export const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in
    const checkLoggedInStatus = async () => {
      try {
        // Make an API call to check if the user is logged in
        const response = await loginUser({}); // Replace {} with the appropriate request parameters

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

  const handleLogin = async (loginData: UserLoginRequest) => {
    try {
      // Make an API call to log in the user
      const response: UserLoginResponse = await loginUser(loginData);

      // Check the response and update the isLoggedIn state accordingly
      if (response.success) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    // Perform any necessary cleanup or API calls to log out the user
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};