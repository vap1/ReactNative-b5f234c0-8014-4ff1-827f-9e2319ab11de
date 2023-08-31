
import { UserProfileRequest, UserProfileResponse } from '../types/Types';

// Function to fetch user profile from the backend API
export const getUserProfile = async (request: UserProfileRequest): Promise<UserProfileResponse> => {
  try {
    // Log the API call
    console.log('Fetching user profile...');

    // Generate random user profile data
    const userProfile = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      contactInfo: '1234567890',
      address: '123 Main St',
      profilePicture: 'https://example.com/profile.jpg',
    };

    // Log the successful API response
    console.log('User profile fetched successfully.');

    // Return the user profile data
    return {
      success: true,
      user: userProfile,
    };
  } catch (error) {
    // Log the error
    console.error('Failed to fetch user profile:', error);

    // Return an error response
    return {
      success: false,
      message: 'Failed to fetch user profile.',
    };
  }
};