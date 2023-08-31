
import { AdminUserDetailsRequest, AdminUserDetailsResponse, User } from '../types/Types';

// Function to generate random user data
const generateRandomUserData = (): User[] => {
  // Generate an array of random users
  const users: User[] = [];

  for (let i = 0; i < 10; i++) {
    const user: User = {
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      contactInfo: `Contact Info ${i + 1}`,
      address: `Address ${i + 1}`,
      profilePicture: `https://example.com/profiles/user${i + 1}.jpg`,
    };

    users.push(user);
  }

  return users;
};

// Function to get admin user details
const getAdminUserDetails = (request: AdminUserDetailsRequest): AdminUserDetailsResponse => {
  console.log('Fetching admin user details...');

  // Simulate API call delay
  const delay = Math.floor(Math.random() * 2000) + 1000;
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = generateRandomUserData();
      console.log('Admin user details fetched successfully:', users);
      resolve({ users });
    }, delay);
  });
};

export default {
  getAdminUserDetails,
};