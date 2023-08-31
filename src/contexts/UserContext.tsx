
import React, { createContext, useState, useEffect } from 'react';
import { UserProfileRequest, UserProfileResponse, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { getUserProfile, updateUserProfile } from '../apis/ProfileApi';

interface UserContextProps {
  userProfile: UserProfileResponse | null;
  loading: boolean;
  error: string | null;
  getUserProfile: () => void;
  updateUserProfile: (request: UserProfileUpdateRequest) => void;
}

export const UserContext = createContext<UserContextProps>({
  userProfile: null,
  loading: false,
  error: null,
  getUserProfile: () => {},
  updateUserProfile: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    setLoading(true);
    setError(null);

    getUserProfile()
      .then((response: UserProfileResponse) => {
        setUserProfile(response);
        setLoading(false);
      })
      .catch((error: string) => {
        setError(error);
        setLoading(false);
      });
  };

  const updateUserProfile = (request: UserProfileUpdateRequest) => {
    setLoading(true);
    setError(null);

    updateUserProfile(request)
      .then((response: UserProfileUpdateResponse) => {
        // Log the response here
        console.log('User profile update response:', response);
        getUserProfile();
      })
      .catch((error: string) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <UserContext.Provider
      value={{
        userProfile,
        loading,
        error,
        getUserProfile,
        updateUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};