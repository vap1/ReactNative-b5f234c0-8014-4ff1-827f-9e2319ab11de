
import { AdminUserDetailsRequest, AdminUserDetailsResponse } from '../types/Types';

const getAdminUserDetails = async (request: AdminUserDetailsRequest): Promise<AdminUserDetailsResponse> => {
  try {
    console.log('Calling getAdminUserDetails API');
    console.log('Request:', request);

    // Simulating API call and generating random data
    const users = generateRandomUsers();

    console.log('API Response:', users);

    return { users };
  } catch (error) {
    console.error('Error in getAdminUserDetails API:', error);
    throw error;
  }
};

const generateRandomUsers = () => {
  // Generate random user data
  const users = [];

  for (let i = 0; i < 10; i++) {
    const user = {
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      contactInfo: `Contact Info ${i + 1}`,
      address: `Address ${i + 1}`,
      profilePicture: `https://example.com/profile${i + 1}.jpg`,
    };

    users.push(user);
  }

  return users;
};

export default {
  getAdminUserDetails,
};