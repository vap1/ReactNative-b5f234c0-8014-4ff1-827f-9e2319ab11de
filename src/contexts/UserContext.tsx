
import React, { createContext, useState, useEffect } from 'react';
import { UserProfileResponse, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { getUserProfile, updateUserProfile } from '../apis/ProfileApi';

// Step 1: Create the UserContext
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

// Step 2: Create the UserProvider component
export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Step 3: Define the getUserProfile function
  const getUserProfile = () => {
    setLoading(true);
    setError(null);

    getUserProfile()
      .then((response: UserProfileResponse) => {
        setUser(response.user);
      })
      .catch((error: string) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Step 4: Define the updateUserProfile function
  const updateUserProfile = (request: UserProfileUpdateRequest) => {
    setLoading(true);
    setError(null);

    updateUserProfile(request)
      .then((response: UserProfileUpdateResponse) => {
        if (response.success) {
          getUserProfile();
        } else {
          setError(response.message);
        }
      })
      .catch((error: string) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Step 5: Fetch the user profile on component mount
  useEffect(() => {
    getUserProfile();
  }, []);

  // Step 6: Provide the context values to the children components
  return (
    <UserContext.Provider value={{ user, loading, error, getUserProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};