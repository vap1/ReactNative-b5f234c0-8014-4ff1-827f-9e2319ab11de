
import { AdminUserDetailsRequest, AdminUserDetailsResponse, User } from '../types/Types';

// Function to generate random user data
const generateRandomUserData = (): User => {
  const randomName = `User ${Math.floor(Math.random() * 100)}`;
  const randomEmail = `user${Math.floor(Math.random() * 100)}@example.com`;
  const randomContactInfo = `Contact Info ${Math.floor(Math.random() * 100)}`;
  const randomAddress = `Address ${Math.floor(Math.random() * 100)}`;
  const randomProfilePicture = `https://example.com/profiles/user${Math.floor(Math.random() * 100)}.jpg`;

  return {
    name: randomName,
    email: randomEmail,
    contactInfo: randomContactInfo,
    address: randomAddress,
    profilePicture: randomProfilePicture,
  };
};

export const getAdminUserDetails = async (request: AdminUserDetailsRequest): Promise<AdminUserDetailsResponse> => {
  try {
    // Log: Fetching admin user details
    console.log('Fetching admin user details');

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate random user data
    const users: User[] = [];
    for (let i = 0; i < 10; i++) {
      const randomUser = generateRandomUserData();
      users.push(randomUser);
    }

    // Log: Admin user details fetched successfully
    console.log('Admin user details fetched successfully');

    return {
      users,
    };
  } catch (error) {
    // Log: Error fetching admin user details
    console.error('Error fetching admin user details:', error);

    throw error;
  }
};