
import { AdminUserDetailsRequest, AdminUserDetailsResponse, User } from '../types/Types';

// Function to generate random user data
const generateRandomUserData = (): User => {
  // Generate random user details
  const user: User = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    contactInfo: '1234567890',
    address: '123 Main St',
    profilePicture: 'https://example.com/profile.jpg',
  };

  return user;
};

// Function to get admin user details
const getAdminUserDetails = async (request: AdminUserDetailsRequest): Promise<AdminUserDetailsResponse> => {
  try {
    // Log the request details
    console.log('Admin User Details Request:', request);

    // Generate random user data
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
      const user = generateRandomUserData();
      users.push(user);
    }

    // Log the response details
    console.log('Admin User Details Response:', users);

    // Return the response
    return { users };
  } catch (error) {
    // Log the error
    console.error('Error in getting admin user details:', error);

    // Throw the error
    throw error;
  }
};

export default {
  getAdminUserDetails,
};