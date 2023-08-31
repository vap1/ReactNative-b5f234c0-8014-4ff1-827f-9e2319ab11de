
import React, { createContext, useState } from 'react';
import { UserProfileRequest, UserProfileResponse } from '../types/Types';
import { getUserProfile } from '../apis/ProfileApi';

interface UserContextProps {
  userProfile: UserProfileResponse | null;
  fetchUserProfile: (token: string) => Promise<void>;
}

export const UserContext = createContext<UserContextProps>({
  userProfile: null,
  fetchUserProfile: async () => {},
});

const UserContextProvider: React.FC = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);

  const fetchUserProfile = async (token: string) => {
    try {
      // Log the fetch user profile request
      console.log('Fetch user profile request:', { token });

      // Make the API call to fetch user profile
      const request: UserProfileRequest = { token };
      const response: UserProfileResponse = await getUserProfile(request);

      // Log the fetch user profile response
      console.log('Fetch user profile response:', response);

      // Update the user profile if successful
      if (response.user) {
        setUserProfile(response);
      }
    } catch (error) {
      // Log any errors that occur during fetch user profile
      console.error('Fetch user profile error:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;