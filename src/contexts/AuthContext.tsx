
import React, { createContext, useState } from 'react';
import { UserLoginRequest, UserLoginResponse } from '../types/Types';
import { loginUser } from '../apis/AuthApi';

interface AuthContextProps {
  userToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  userToken: null,
  login: async () => {},
  logout: () => {},
});

const AuthContextProvider: React.FC = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      // Log the login request
      console.log('Login request:', { email, password });

      // Make the API call to login
      const request: UserLoginRequest = { email, password };
      const response: UserLoginResponse = await loginUser(request);

      // Log the login response
      console.log('Login response:', response);

      // Update the user token if login is successful
      if (response.success) {
        setUserToken(response.token || null);
      }
    } catch (error) {
      // Log any errors that occur during login
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    // Log the logout action
    console.log('Logout');

    // Clear the user token
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;