
import React, { createContext, useState } from 'react';
import { loginUser } from '../apis/AuthApi';
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

// Step 1: Create the AuthContext
interface AuthContextProps {
  user: UserLoginResponse | null;
  login: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
});

// Step 2: Create the AuthProvider component
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserLoginResponse | null>(null);

  // Step 3: Implement the login function
  const login = async (email: string, password: string) => {
    try {
      // Step 4: Make the API call to login
      const request: UserLoginRequest = { email, password };
      const response = await loginUser(request);

      // Step 5: Update the user state
      setUser(response);

      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Step 6: Provide the context value to the children components
  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};