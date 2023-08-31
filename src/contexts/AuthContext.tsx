
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

  const login = async (request: UserLoginRequest) => {
    try {
      console.log('AuthContext: Logging in...');
      const response = await loginUser(request);
      console.log('AuthContext: Login successful');
      setUser(response);
    } catch (error) {
      console.error('AuthContext: Login failed', error);
      // Handle error
    }
  };

  const logout = () => {
    console.log('AuthContext: Logging out...');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;