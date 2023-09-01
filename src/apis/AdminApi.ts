
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
const getAdminUserDetails = (request: AdminUserDetailsRequest): AdminUserDetailsResponse => {
  // Log: AdminApi - getAdminUserDetails - Fetching admin user details
  console.log('Fetching admin user details...');

  // Generate random user data
  const users: User[] = [];
  for (let i = 0; i < 10; i++) {
    users.push(generateRandomUser());
  }

  // Log: AdminApi - getAdminUserDetails - Admin user details fetched successfully
  console.log('Admin user details fetched successfully:', users);

  return {
    users,
  };
};

export default getAdminUserDetails;