
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

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Log the API response
    console.log('User profile fetched successfully:', userProfile);

    // Return the user profile data
    return {
      success: true,
      user: userProfile,
    };
  } catch (error) {
    // Log the API error
    console.error('Failed to fetch user profile:', error);

    // Return the error response
    return {
      success: false,
      message: 'Failed to fetch user profile',
    };
  }
};