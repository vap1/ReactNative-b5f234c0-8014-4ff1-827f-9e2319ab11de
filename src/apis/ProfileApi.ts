
import { UserProfileRequest, UserProfileResponse } from '../types/Types';

export const getUserProfile = async (request: UserProfileRequest): Promise<UserProfileResponse> => {
  try {
    // Log the fetch user profile request
    console.log('Fetch user profile request:', request);

    // Generate random user profile data
    const userProfile: UserProfileResponse = {
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        contactInfo: '1234567890',
        address: '123 Main St',
        profilePicture: 'https://example.com/profile.jpg',
      },
    };

    // Log the fetch user profile response
    console.log('Fetch user profile response:', userProfile);

    return userProfile;
  } catch (error) {
    // Log any errors that occur during fetch user profile
    console.error('Fetch user profile error:', error);

    throw error;
  }
};