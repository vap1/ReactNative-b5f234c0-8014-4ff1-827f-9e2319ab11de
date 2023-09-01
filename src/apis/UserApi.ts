
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';

// Function to simulate user registration API call
export const registerUser = async (request: UserRegistrationRequest): Promise<UserRegistrationResponse> => {
  try {
    // Log: UserApi - registerUser - Sending user registration request
    console.log('Sending user registration request:', request);

    // Simulate API call and generate random response
    const response: UserRegistrationResponse = {
      success: true,
      message: 'User registration successful',
    };

    // Log: UserApi - registerUser - User registration response received
    console.log('User registration response received:', response);

    return response;
  } catch (error) {
    // Log: UserApi - registerUser - Error occurred during user registration
    console.error('Error occurred during user registration:', error);

    throw error;
  }
};