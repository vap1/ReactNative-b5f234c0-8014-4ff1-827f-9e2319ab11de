
import React, { createContext, useState } from 'react';
import { UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { updateUserProfile } from '../apis/ProfileUpdateApi';

interface UserContextProps {
  userProfile: UserProfileUpdateRequest | null;
  updateUserProfile: (updatedProfile: UserProfileUpdateRequest) => Promise<UserProfileUpdateResponse>;
}

export const UserContext = createContext<UserContextProps>({
  userProfile: null,
  updateUserProfile: async () => {
    throw new Error('updateUserProfile function not implemented');
  },
});

export const UserProvider: React.FC = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfileUpdateRequest | null>(null);

  const handleUpdateUserProfile = async (updatedProfile: UserProfileUpdateRequest) => {
    try {
      // Log: Sending update profile request
      console.log('Sending update profile request:', updatedProfile);

      const response = await updateUserProfile(updatedProfile);

      // Log: Update profile response
      console.log('Update profile response:', response);

      // Update the user profile state
      setUserProfile(updatedProfile);

      return response;
    } catch (error) {
      // Log: Error updating profile
      console.error('Error updating profile:', error);

      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, updateUserProfile: handleUpdateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};