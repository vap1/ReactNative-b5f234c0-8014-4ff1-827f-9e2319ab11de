
import { UserProfileRequest, UserProfileResponse } from '../types/Types';

const getUserProfile = async (request: UserProfileRequest): Promise<UserProfileResponse> => {
  try {
    // Log the API call
    console.log('Calling getUserProfile API');

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

    // Return the random user profile data
    return {
      success: true,
      user: userProfile,
    };
  } catch (error) {
    // Log and handle any errors
    console.error('Error in getUserProfile API:', error);

    // Return an error response
    return {
      success: false,
      message: 'Failed to get user profile',
    };
  }
};

export default getUserProfile;