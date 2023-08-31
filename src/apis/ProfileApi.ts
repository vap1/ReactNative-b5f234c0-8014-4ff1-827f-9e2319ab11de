
import { UserProfileRequest, UserProfileResponse } from '../types/Types';

const API_ENDPOINT = '/api/profile';

export const getUserProfile = async (request: UserProfileRequest): Promise<UserProfileResponse> => {
  try {
    console.log('Sending getUserProfile API request:', request);

    // Simulating API call and generating random data
    const userProfile = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      contactInfo: '1234567890',
      address: '123 Main St',
      profilePicture: 'https://example.com/profile.jpg',
    };

    console.log('Received getUserProfile API response:', userProfile);

    return { success: true, user: userProfile };
  } catch (error) {
    console.error('Error in getUserProfile API:', error);
    return { success: false, message: 'Failed to get user profile' };
  }
};