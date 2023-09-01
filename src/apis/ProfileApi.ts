
import { UserProfileRequest, UserProfileResponse } from '../types/Types';

// Function to generate random user profile data
const generateRandomUserProfile = (): UserProfileResponse => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    contactInfo: '1234567890',
    address: '123 Main St',
    profilePicture: 'https://example.com/profile.jpg',
  };

  return { user };
};

// Function to fetch user profile
export const getUserProfile = async (): Promise<UserProfileResponse> => {
  try {
    console.log('Fetching user profile...');

    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const userProfile = generateRandomUserProfile();

    console.log('User profile fetched:', userProfile);

    return userProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
};