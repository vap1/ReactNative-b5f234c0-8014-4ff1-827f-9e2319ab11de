
import { UserProfileRequest, UserProfileResponse } from '../types/Types';

// Function to fetch user profile
export const getUserProfile = async (): Promise<UserProfileResponse> => {
  // Log: Fetching user profile
  console.log('Fetching user profile');

  // Simulate API call and generate random user profile data
  const userProfile: UserProfileResponse = {
    user: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      contactInfo: '1234567890',
      address: '123 Main St',
      profilePicture: 'https://example.com/profile.jpg',
    },
  };

  // Log: User profile fetched successfully
  console.log('User profile fetched successfully');

  return userProfile;
};

// Function to update user profile
export const updateUserProfile = async (): Promise<UserProfileResponse> => {
  // Log: Updating user profile
  console.log('Updating user profile');

  // Simulate API call and generate random updated user profile data
  const updatedUserProfile: UserProfileResponse = {
    user: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      contactInfo: '9876543210',
      address: '456 Elm St',
      profilePicture: 'https://example.com/profile_updated.jpg',
    },
  };

  // Log: User profile updated successfully
  console.log('User profile updated successfully');

  return updatedUserProfile;
};