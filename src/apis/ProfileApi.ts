
import { UserProfileRequest, UserProfileResponse } from '../types/Types';

const getUserProfile = async (request: UserProfileRequest): Promise<UserProfileResponse> => {
  try {
    // Log the API call
    console.log('Calling getUserProfile API');

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

    // Log the response
    console.log('getUserProfile API response:', userProfile);

    return userProfile;
  } catch (error) {
    // Log the error
    console.error('Error in getUserProfile API:', error);

    // Throw the error
    throw error;
  }
};

export default getUserProfile;