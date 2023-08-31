
import React, { createContext, useState, useEffect } from 'react';
import { UserProfileResponse, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { getUserProfile, updateUserProfile } from '../apis/ProfileApi';

interface UserContextProps {
  user: UserProfileResponse | null;
  loading: boolean;
  error: string | null;
  getUserProfile: () => void;
  updateUserProfile: (request: UserProfileUpdateRequest) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  loading: false,
  error: null,
  getUserProfile: () => {},
  updateUserProfile: () => {},
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
      .then((response: UserProfileResponse) => {
        setUser(response.user);
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
        if (response.success) {
          getUserProfile();
        } else {
          setError(response.message);
          setLoading(false);
        }
      })
      .catch((error: string) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <UserContext.Provider value={{ user, loading, error, getUserProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};