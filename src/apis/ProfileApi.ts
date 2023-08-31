
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
        contactInfo: '123-456-7890',
        address: '123 Main St, City, State',
        profilePicture: 'https://example.com/profile.jpg',
      },
    };

    // Log the API response
    console.log('getUserProfile API response:', userProfile);

    // Return the user profile data
    return userProfile;
  } catch (error) {
    // Log any errors
    console.error('Error in getUserProfile API:', error);

    // Throw the error to be handled by the caller
    throw error;
  }
};

export default getUserProfile;