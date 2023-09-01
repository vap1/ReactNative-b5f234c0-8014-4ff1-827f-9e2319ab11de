
import React, { createContext, useState, useEffect } from 'react';
import { UserProfileResponse } from '../types/Types';
import { getUserProfile } from '../apis/ProfileApi';

interface UserContextProps {
  user: UserProfileResponse | null;
  loading: boolean;
  error: string | null;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  loading: false,
  error: null,
});

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching user profile...');

        const response = await getUserProfile();
        console.log('User profile fetched:', response);

        setUser(response.user);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};