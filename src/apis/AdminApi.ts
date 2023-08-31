
import { AdminUserDetailsRequest, AdminUserDetailsResponse, User } from '../types/Types';

export const getAdminUserDetails = async (request: AdminUserDetailsRequest): Promise<AdminUserDetailsResponse> => {
  try {
    // Log the get admin user details request
    console.log('Get admin user details request:', request);

    // Generate random user details
    const users: User[] = [
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        contactInfo: '1234567890',
        address: '123 Main St',
        profilePicture: 'https://example.com/profile1.jpg',
      },
      {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        contactInfo: '9876543210',
        address: '456 Elm St',
        profilePicture: 'https://example.com/profile2.jpg',
      },
    ];

    // Create a random response
    const response: AdminUserDetailsResponse = {
      users,
    };

    // Log the get admin user details response
    console.log('Get admin user details response:', response);

    return response;
  } catch (error) {
    // Log any errors that occur during get admin user details
    console.error('Get admin user details error:', error);

    throw error;
  }
};