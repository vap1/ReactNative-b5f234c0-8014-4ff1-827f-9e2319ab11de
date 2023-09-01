
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Log: Fetching user data from local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      // Log: User data found in local storage
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (request: UserLoginRequest) => {
    try {
      // Log: Sending login request to the server
      const response = await loginUser(request);
      // Log: Login successful
      setUser(response);
      // Log: Saving user data to local storage
      localStorage.setItem('user', JSON.stringify(response));
    } catch (error) {
      // Log: Login failed
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    // Log: Clearing user data from local storage
    localStorage.removeItem('user');
    // Log: User logged out
    setUser(null);
  };

  if (loading) {
    // Log: Loading state
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};