
import React, { createContext, useState, useEffect } from 'react';
import { UserProfileResponse, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { getUserProfile, updateUserProfile } from '../apis/ProfileApi';

interface UserContextProps {
  user: UserProfileResponse | null;
  loading: boolean;
  error: string | null;
  getUserProfile: () => void;
  updateUserProfile: (request: UserProfileUpdateRequest) => Promise<UserProfileUpdateResponse>;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  loading: false,
  error: null,
  getUserProfile: () => {},
  updateUserProfile: () => Promise.resolve({ success: false, message: '' }),
});

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProfileResponse | null>(null);
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
        setUser(response.user);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch user profile');
        setLoading(false);
      });
  };

  const updateUserProfile = (request: UserProfileUpdateRequest) => {
    setLoading(true);
    setError(null);

    return updateUserProfile(request)
      .then((response) => {
        if (response.success) {
          getUserProfile();
        }
        setLoading(false);
        return response;
      })
      .catch((error) => {
        setError('Failed to update user profile');
        setLoading(false);
        return { success: false, message: '' };
      });
  };

  return (
    <UserContext.Provider value={{ user, loading, error, getUserProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};