
import { UserProfileUpdateRequest, UserProfileUpdateResponse } from '../types/Types';

const updateUserProfile = async (request: UserProfileUpdateRequest): Promise<UserProfileUpdateResponse> => {
  // Log: Updating user profile
  console.log('Updating user profile');

  // Generate random data for demonstration purposes
  const updatedProfile: UserProfileUpdateResponse = {
    success: true,
    message: 'User profile updated successfully',
  };

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Log: User profile updated successfully
  console.log('User profile updated successfully');

  return updatedProfile;
};

export default updateUserProfile;