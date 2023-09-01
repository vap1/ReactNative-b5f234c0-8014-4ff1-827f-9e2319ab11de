
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';

// Function to simulate the user registration API call
export const registerUser = async (request: UserRegistrationRequest): Promise<UserRegistrationResponse> => {
  try {
    // Log the registration request
    console.log('User Registration Request:', request);

    // Simulate API call and generate a random response
    const response: UserRegistrationResponse = {
      success: true,
      message: 'User registration successful',
    };

    // Log the registration response
    console.log('User Registration Response:', response);

    return response;
  } catch (error) {
    // Log any errors that occur during the API call
    console.error('Error registering user:', error);

    // Return an error response
    return {
      success: false,
      message: 'Error registering user',
    };
  }
};