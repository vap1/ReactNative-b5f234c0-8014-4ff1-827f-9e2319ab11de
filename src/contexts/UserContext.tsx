
import React, { createContext, useState, useEffect } from 'react';
import { UserProfileResponse, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { getUserProfile, updateUserProfile } from '../apis/ProfileApi';

interface UserContextProps {
  userProfile: UserProfileResponse | null;
  updateUserProfile: (request: UserProfileUpdateRequest) => Promise<UserProfileUpdateResponse>;
}

export const UserContext = createContext<UserContextProps>({
  userProfile: null,
  updateUserProfile: () => Promise.resolve({ success: false, message: '' }),
});

export const UserProvider: React.FC = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);

  useEffect(() => {
    // Fetch user profile on component mount
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUserProfile(response.user);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateUserProfile = async (request: UserProfileUpdateRequest) => {
    try {
      const response = await updateUserProfile(request);
      if (response.success) {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          name: request.name || prevProfile?.name,
          contactInfo: request.contactInfo || prevProfile?.contactInfo,
          address: request.address || prevProfile?.address,
          profilePicture: request.profilePicture || prevProfile?.profilePicture,
        }));
      }
      return response;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      return { success: false, message: 'Failed to update user profile' };
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, updateUserProfile: handleUpdateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};