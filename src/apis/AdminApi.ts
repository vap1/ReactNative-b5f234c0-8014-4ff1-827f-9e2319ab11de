
import { AdminUserDetailsRequest, AdminUserDetailsResponse, User } from '../types/Types';

// Function to generate random user data
const generateRandomUserData = (): User => {
  const randomName = 'User ' + Math.floor(Math.random() * 100);
  const randomEmail = 'user' + Math.floor(Math.random() * 100) + '@example.com';
  const randomContactInfo = 'Contact Info ' + Math.floor(Math.random() * 100);
  const randomAddress = 'Address ' + Math.floor(Math.random() * 100);
  const randomProfilePicture = 'https://example.com/profile-picture-' + Math.floor(Math.random() * 100) + '.jpg';

  return {
    name: randomName,
    email: randomEmail,
    contactInfo: randomContactInfo,
    address: randomAddress,
    profilePicture: randomProfilePicture,
  };
};

// Function to get admin user details
const getAdminUserDetails = (request: AdminUserDetailsRequest): AdminUserDetailsResponse => {
  console.log('Fetching admin user details...');

  // Generate random user data
  const users: User[] = [];
  for (let i = 0; i < 10; i++) {
    const user = generateRandomUserData();
    users.push(user);
  }

  console.log('Admin user details fetched successfully.');

  return {
    users,
  };
};

export default {
  getAdminUserDetails,
};