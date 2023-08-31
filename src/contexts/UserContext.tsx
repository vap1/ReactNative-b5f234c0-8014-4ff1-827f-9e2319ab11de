
import React, { createContext, useState, useEffect } from 'react';
import { UserProfileResponse, UserProfileUpdateRequest } from '../types/Types';
import { getUserProfile, updateUserProfile } from '../apis/ProfileApi';

interface UserContextProps {
  user: UserProfileResponse | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfileResponse | null>>;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProfileResponse | null>(null);

  useEffect(() => {
    // Log: Fetching user profile
    console.log('Fetching user profile');

    getUserProfile()
      .then((response) => {
        // Log: User profile fetched successfully
        console.log('User profile fetched successfully');
        setUser(response);
      })
      .catch((error) => {
        // Log: Error fetching user profile
        console.error('Error fetching user profile:', error);
      });
  }, []);

  const handleUpdateProfile = (request: UserProfileUpdateRequest) => {
    // Log: Updating user profile
    console.log('Updating user profile');

    updateUserProfile(request)
      .then((response) => {
        // Log: User profile updated successfully
        console.log('User profile updated successfully');
        setUser(response);
      })
      .catch((error) => {
        // Log: Error updating user profile
        console.error('Error updating user profile:', error);
      });
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleUpdateProfile }}>
      {children}
    </UserContext.Provider>
  );
};