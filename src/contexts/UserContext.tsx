
import React, { createContext, useState, useEffect } from 'react';
import { UserProfileResponse, UserProfileUpdateRequest } from '../types/Types';
import { getUserProfile, updateUserProfile } from '../apis/ProfileApi';

interface UserContextProps {
  user: UserProfileResponse | null;
  getUserProfile: () => void;
  updateUserProfile: (request: UserProfileUpdateRequest) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  getUserProfile: () => {},
  updateUserProfile: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProfileResponse | null>(null);

  useEffect(() => {
    getUserProfile()
      .then((response) => {
        console.log('getUserProfile response:', response);
        setUser(response.user);
      })
      .catch((error) => {
        console.log('getUserProfile error:', error);
      });
  }, []);

  const handleUpdateUserProfile = (request: UserProfileUpdateRequest) => {
    updateUserProfile(request)
      .then((response) => {
        console.log('updateUserProfile response:', response);
        setUser(response.user);
      })
      .catch((error) => {
        console.log('updateUserProfile error:', error);
      });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        getUserProfile,
        updateUserProfile: handleUpdateUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};