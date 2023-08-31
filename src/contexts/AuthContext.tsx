
import React, { createContext, useState } from 'react';
import { UserLoginRequest, UserLoginResponse } from '../types/Types';
import { loginUser } from '../apis/AuthApi';

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
});

const AuthContextProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      // Make API call to login user
      const loginRequest: UserLoginRequest = { email, password };
      const response: UserLoginResponse = await loginUser(loginRequest);

      if (response.success) {
        setIsLoggedIn(true);
        console.log('User logged in successfully');
      } else {
        console.log('Login failed:', response.message);
      }
    } catch (error) {
      console.log('Error occurred during login:', error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;