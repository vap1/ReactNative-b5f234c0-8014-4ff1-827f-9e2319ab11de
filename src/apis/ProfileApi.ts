
import { UserProfileRequest, UserProfileResponse } from '../types/Types';

const getUserProfile = async (request: UserProfileRequest): Promise<UserProfileResponse> => {
  try {
    console.log('Fetching user profile...');
    // Simulate API call and generate random data
    const userProfile = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      contactInfo: '1234567890',
      address: '123 Main St',
      profilePicture: 'https://example.com/profile.jpg',
    };

    console.log('User profile fetched successfully:', userProfile);
    return { user: userProfile };
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
};

export default getUserProfile;