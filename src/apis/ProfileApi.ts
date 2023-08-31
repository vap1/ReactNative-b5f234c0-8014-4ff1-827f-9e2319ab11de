
import { UserProfileRequest, UserProfileResponse } from '../types/Types';

const getUserProfile = async (request: UserProfileRequest): Promise<UserProfileResponse> => {
  try {
    console.log('Fetching user profile...');
    // Make API call to fetch user profile
    // Replace the following code with your actual API call
    const response = await fetch('/api/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${request.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    // Generate random user profile data for testing
    const userProfile: UserProfileResponse = {
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        contactInfo: '1234567890',
        address: '123 Main St, City, State',
        profilePicture: 'https://example.com/profile.jpg',
      },
    };

    console.log('User profile fetched successfully');
    return userProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    throw error;
  }
};

export default getUserProfile;