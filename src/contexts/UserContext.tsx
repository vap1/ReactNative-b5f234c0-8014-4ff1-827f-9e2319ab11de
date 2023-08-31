
import React, { createContext, useState, useEffect } from 'react';
import { User, UserProfileRequest, UserProfileResponse } from '../types/Types';
import { getUserProfile } from '../apis/ProfileApi';

interface UserContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUserProfile: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  loading: false,
  error: null,
  fetchUserProfile: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Make API call to fetch user profile
      const userProfileRequest: UserProfileRequest = {
        token: 'YOUR_JWT_TOKEN',
      };
      const userProfileResponse: UserProfileResponse = await getUserProfile(userProfileRequest);

      // Update user state with the fetched profile
      setUser(userProfileResponse.user);
    } catch (error) {
      setError('Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};