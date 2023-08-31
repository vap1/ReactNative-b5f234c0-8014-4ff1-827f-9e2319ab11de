
import React, { createContext, useState, useEffect } from 'react';
import { UserProfileResponse, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { getUserProfile, updateUserProfile } from '../apis/ProfileApi';

interface UserContextProps {
  userProfile: UserProfileResponse | null;
  loading: boolean;
  error: string | null;
  getUserProfile: () => void;
  updateUserProfile: (request: UserProfileUpdateRequest) => Promise<UserProfileUpdateResponse>;
}

export const UserContext = createContext<UserContextProps>({
  userProfile: null,
  loading: false,
  error: null,
  getUserProfile: () => {},
  updateUserProfile: () => Promise.resolve({ success: false, message: '' }),
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
      .then((response) => {
        setLoading(false);
        setUserProfile(response.user);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  const updateUserProfile = (request: UserProfileUpdateRequest) => {
    setLoading(true);
    setError(null);

    return updateUserProfile(request)
      .then((response) => {
        setLoading(false);
        setUserProfile(response.user);
        return response;
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        return { success: false, message: error.message };
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