
import React, { createContext, useState, useEffect } from 'react';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { AuthContextProps, User } from '../types/Types';

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: '',
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if the user is already logged in
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      getUserProfile(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const request: UserLoginRequest = { email, password };
      const response: UserLoginResponse = await loginUser(request);
      if (response.success) {
        setToken(response.token);
        localStorage.setItem('token', response.token);
        getUserProfile(response.token);
      } else {
        console.log('Login failed:', response.message);
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
  };

  const getUserProfile = async (token: string) => {
    try {
      // Make API call to get user profile
      // const response = await getUserProfile(token);
      // setUser(response.user);
      console.log('getUserProfile API call');
    } catch (error) {
      console.log('getUserProfile error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};