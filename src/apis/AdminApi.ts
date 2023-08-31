
import { AdminUserDetailsRequest, AdminUserDetailsResponse, User } from '../types/Types';

// Function to generate random user data
const generateRandomUserData = (): User => {
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
  console.log('API Call: getAdminUserDetails');
  console.log('Request:', request);

  // Generate random user data
  const users: User[] = [];
  for (let i = 0; i < 10; i++) {
    users.push(generateRandomUserData());
  }

  const response: AdminUserDetailsResponse = {
    users,
  };

  console.log('Response:', response);
  return response;
};

export default {
  getAdminUserDetails,
};