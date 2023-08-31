
import React, { createContext, useState } from 'react';
import { loginUser, UserLoginRequest, UserLoginResponse } from '../apis/AuthApi';
import { AuthContextProps } from '../types/Types';

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserLoginResponse | null>(null);

  const login = async (email: string, password: string) => {
    try {
      // Log the login attempt
      console.log(`Logging in with email: ${email}`);

      // Create the login request
      const loginRequest: UserLoginRequest = {
        email,
        password,
      };

      // Make the API call to login
      const response = await loginUser(loginRequest);

      // Log the login response
      console.log(`Login response: ${JSON.stringify(response)}`);

      // Update the user state
      setUser(response);
    } catch (error) {
      // Log any errors that occur during login
      console.error(`Error during login: ${error.message}`);
    }
  };

  const logout = () => {
    // Log the logout attempt
    console.log('Logging out');

    // Clear the user state
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;