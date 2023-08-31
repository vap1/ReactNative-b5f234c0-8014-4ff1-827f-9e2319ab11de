
import React, { createContext, useState } from 'react';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { AuthContextProps } from '../types/Types';

export const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      // Log in the user
      const request: UserLoginRequest = { email, password };
      const response: UserLoginResponse = await loginUser(request);

      if (response.success) {
        setIsLoggedIn(true);
        console.log('User logged in successfully');
      } else {
        setError(response.message);
        console.log('Login failed:', response.message);
      }
    } catch (error) {
      setError('An error occurred during login');
      console.error('Login error:', error);
    }

    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, error, login }}>
      {children}
    </AuthContext.Provider>
  );
};