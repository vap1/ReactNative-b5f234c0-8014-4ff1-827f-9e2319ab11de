
import React, { createContext, useState, useEffect } from 'react';
import { UserProfileResponse, UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';
import { getUserProfile, updateUserProfile } from '../apis/ProfileApi';

// Step 1: Create the UserContextProps interface
interface UserContextProps {
  user: UserProfileResponse | null;
  loading: boolean;
  error: string | null;
  getUserProfile: () => void;
  updateUserProfile: (request: UserProfileUpdateRequest) => Promise<UserProfileUpdateResponse>;
}

// Step 2: Create the initial context values
const initialContext: UserContextProps = {
  user: null,
  loading: false,
  error: null,
  getUserProfile: () => {},
  updateUserProfile: () => Promise.resolve({ success: false, message: '' }),
};

// Step 3: Create the UserContext
export const UserContext = createContext<UserContextProps>(initialContext);

// Step 4: Create the UserProvider component
export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Step 5: Implement the getUserProfile function
  const getUserProfile = () => {
    setLoading(true);
    setError(null);

    getUserProfile()
      .then((response: UserProfileResponse) => {
        setUser(response);
        setLoading(false);
      })
      .catch((error: string) => {
        setError(error);
        setLoading(false);
      });
  };

  // Step 6: Implement the updateUserProfile function
  const updateUserProfile = (request: UserProfileUpdateRequest) => {
    setLoading(true);
    setError(null);

    return updateUserProfile(request)
      .then((response: UserProfileUpdateResponse) => {
        if (response.success) {
          // Update the user object with the updated profile
          setUser((prevUser) => ({
            ...prevUser,
            name: request.name || prevUser.name,
            contactInfo: request.contactInfo || prevUser.contactInfo,
            address: request.address || prevUser.address,
            profilePicture: request.profilePicture || prevUser.profilePicture,
          }));
        }
        setLoading(false);
        return response;
      })
      .catch((error: string) => {
        setError(error);
        setLoading(false);
        return { success: false, message: error };
      });
  };

  // Step 7: Implement the useEffect hook to fetch user profile on component mount
  useEffect(() => {
    getUserProfile();
  }, []);

  // Step 8: Return the UserContext.Provider with the context values
  return (
    <UserContext.Provider value={{ user, loading, error, getUserProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};