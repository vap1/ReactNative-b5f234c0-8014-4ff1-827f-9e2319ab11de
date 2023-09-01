
import React, { createContext, useState, useEffect } from 'react';
import { UserProfileResponse, UserProfileUpdateRequest } from '../types/Types';
import { getUserProfile, updateUserProfile } from '../apis/ProfileApi';

interface UserContextProps {
  userProfile: UserProfileResponse | null;
  updateUserProfile: (request: UserProfileUpdateRequest) => void;
}

export const UserContext = createContext<UserContextProps>({
  userProfile: null,
  updateUserProfile: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);

  useEffect(() => {
    // Log: Fetching user profile
    console.log('Fetching user profile');

    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUserProfile(response);
        // Log: User profile fetched successfully
        console.log('User profile fetched successfully');
      } catch (error) {
        // Log: Error fetching user profile
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateUserProfile = async (request: UserProfileUpdateRequest) => {
    // Log: Updating user profile
    console.log('Updating user profile');

    try {
      const response = await updateUserProfile(request);
      setUserProfile(response);
      // Log: User profile updated successfully
      console.log('User profile updated successfully');
    } catch (error) {
      // Log: Error updating user profile
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, updateUserProfile: handleUpdateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};