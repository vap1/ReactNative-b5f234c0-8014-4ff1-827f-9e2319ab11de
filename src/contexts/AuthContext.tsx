
import React, { createContext, useState } from 'react';
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';
import { registerUser } from '../apis/UserApi';

interface AuthContextProps {
  register: (registrationData: UserRegistrationRequest) => Promise<UserRegistrationResponse>;
}

export const AuthContext = createContext<AuthContextProps>({
  register: () => Promise.resolve({ success: false, message: '' }),
});

const AuthContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const register = async (registrationData: UserRegistrationRequest) => {
    try {
      setLoading(true);
      console.log('Registering user:', registrationData);

      const response = await registerUser(registrationData);
      console.log('Registration response:', response);

      setLoading(false);
      return response;
    } catch (error) {
      console.error('Error registering user:', error);
      setLoading(false);
      return { success: false, message: 'An error occurred during registration.' };
    }
  };

  return (
    <AuthContext.Provider value={{ register }}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;