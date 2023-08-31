
import React, { createContext, useState, useEffect } from 'react';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { AuthContextProps } from '../types/Types';

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserLoginResponse | null>(null);

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user profile using the token
      // Add appropriate API call here
      // Log the response
      console.log('Fetching user profile using token:', token);
    }
  }, []);

  const login = async (request: UserLoginRequest) => {
    try {
      // Make API call to login user
      const response = await loginUser(request);
      // Set the user in the context
      setUser(response);
      // Store the token in local storage
      localStorage.setItem('token', response.token);
      // Log the successful login
      console.log('User logged in:', response);
    } catch (error) {
      // Log the error
      console.error('Error logging in:', error);
    }
  };

  const logout = () => {
    // Clear the user from the context
    setUser(null);
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Log the logout
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};