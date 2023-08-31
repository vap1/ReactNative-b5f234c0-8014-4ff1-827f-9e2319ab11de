
import React, { createContext, useState, useEffect } from 'react';
import { UserProfileResponse, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { updateUserProfile } from '../apis/ProfileUpdateApi';

interface UserContextProps {
  userProfile: UserProfileResponse | null;
  updateUserProfile: (updatedProfile: UserProfileUpdateRequest) => Promise<UserProfileUpdateResponse>;
}

export const UserContext = createContext<UserContextProps>({
  userProfile: null,
  updateUserProfile: () => Promise.resolve({ success: false, message: '' }),
});

export const UserProvider: React.FC = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);

  useEffect(() => {
    // Fetch user profile from the API
    const fetchUserProfile = async () => {
      try {
        // Make API call to get user profile
        // const response = await getUserProfile();
        // setUserProfile(response.user);
        console.log('Fetching user profile...');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateUserProfile = async (updatedProfile: UserProfileUpdateRequest) => {
    try {
      // Make API call to update user profile
      // const response = await updateUserProfile(updatedProfile);
      // setUserProfile(response.user);
      console.log('Updating user profile...');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, updateUserProfile: handleUpdateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};