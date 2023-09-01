
import React, { createContext, useState, useEffect } from 'react';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { AuthContextProps } from '../types/Types';

export const AuthContext = createContext<AuthContextProps>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserLoginResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Log: AuthProvider - useEffect - Fetching user data from local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (loginData: UserLoginRequest) => {
    try {
      // Log: AuthProvider - handleLogin - Sending login request
      const response = await loginUser(loginData);
      // Log: AuthProvider - handleLogin - Login response received
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
    } catch (error) {
      // Log: AuthProvider - handleLogin - Error occurred during login
      console.error('Error occurred during login:', error);
    }
  };

  const handleLogout = () => {
    // Log: AuthProvider - handleLogout - Clearing user data from local storage
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};