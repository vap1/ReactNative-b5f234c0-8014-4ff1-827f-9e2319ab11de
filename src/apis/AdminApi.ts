
import { AdminUserDetailsRequest, AdminUserDetailsResponse, User } from '../types/Types';

// Function to generate random user data
const generateRandomUser = (): User => {
  const randomId = Math.floor(Math.random() * 1000);
  return {
    name: `User ${randomId}`,
    email: `user${randomId}@example.com`,
    contactInfo: `Contact Info ${randomId}`,
    address: `Address ${randomId}`,
    profilePicture: `https://example.com/profile/${randomId}.jpg`,
  };
};

// Function to get admin user details
export const getAdminUserDetails = async (request: AdminUserDetailsRequest): Promise<AdminUserDetailsResponse> => {
  try {
    console.log('Fetching admin user details...');
    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate random user data
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
      users.push(generateRandomUser());
    }

    console.log('Admin user details fetched successfully:', users);
    return { users };
  } catch (error) {
    console.error('Failed to fetch admin user details:', error);
    throw new Error('Failed to fetch admin user details');
  }
};