
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
      // Step 4: Call the loginUser API function
      const response = await loginUser({ email, password });

      // Step 5: Update the user state with the response
      setUser(response);
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  // Step 6: Provide the AuthContext value to the children components
  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};