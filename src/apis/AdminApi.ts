
import { AdminUserDetailsRequest, AdminUserDetailsResponse, User } from '../types/Types';

// Function to generate random user data
const generateRandomUserData = (): User[] => {
  const users: User[] = [];

  for (let i = 1; i <= 10; i++) {
    const user: User = {
      name: `User ${i}`,
      email: `user${i}@example.com`,
      contactInfo: `Contact Info ${i}`,
      address: `Address ${i}`,
      profilePicture: `https://example.com/profiles/user${i}.jpg`,
    };

    users.push(user);
  }

  return users;
};

export const getAdminUserDetails = (request: AdminUserDetailsRequest): AdminUserDetailsResponse => {
  // Log: Fetching admin user details
  console.log('Fetching admin user details');

  try {
    // Generate random user data
    const users = generateRandomUserData();

    // Log: Admin user details fetched successfully
    console.log('Admin user details fetched successfully');

    return {
      users,
    };
  } catch (error) {
    // Log: Error fetching admin user details
    console.error('Error fetching admin user details:', error);

    throw new Error('Failed to fetch admin user details');
  }
};