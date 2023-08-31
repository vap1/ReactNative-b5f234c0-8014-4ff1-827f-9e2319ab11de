
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
      // Example: getUserProfile(token).then((response) => setUser(response.user));
    }
  }, []);

  const login = (request: UserLoginRequest) => {
    // Add loading state and error handling logic here
    // Example: setLoading(true);
    loginUser(request)
      .then((response) => {
        // Set the user in the context and store the token
        setUser(response);
        localStorage.setItem('token', response.token);
      })
      .catch((error) => {
        // Handle login error
        console.error('Login error:', error);
      })
      .finally(() => {
        // Add loading state handling here
        // Example: setLoading(false);
      });
  };

  const logout = () => {
    // Clear the user from the context and remove the token
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};