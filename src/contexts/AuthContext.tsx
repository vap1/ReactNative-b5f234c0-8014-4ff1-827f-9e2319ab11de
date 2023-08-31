
import React, { createContext, useState } from 'react';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { AuthContextProps } from '../types/Types';

// Create the AuthContext
export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

// Create the AuthProvider component
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserLoginResponse | null>(null);

  // Function to handle user login
  const login = async (request: UserLoginRequest) => {
    try {
      console.log('Logging in...');
      const response = await loginUser(request);
      console.log('Login successful:', response);
      setUser(response);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // Function to handle user logout
  const logout = () => {
    console.log('Logging out...');
    setUser(null);
  };

  // Provide the AuthContext value to the children components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};