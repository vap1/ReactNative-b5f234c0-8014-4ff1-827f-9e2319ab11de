
import React, { createContext, useState } from 'react';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { AuthContextProps } from '../types/Types';

export const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <AuthContext.Provider value={{ isLoading, isLoggedIn, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};