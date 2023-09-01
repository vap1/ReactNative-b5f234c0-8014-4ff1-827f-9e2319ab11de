
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';

export const registerUser = async (request: UserRegistrationRequest): Promise<UserRegistrationResponse> => {
  try {
    // Log: Sending user registration request to the server
    console.log('Sending user registration request:', request);

    // Simulating API call and generating random data
    const response: UserRegistrationResponse = {
      success: true,
      message: 'User registration successful',
    };

    // Log: User registration successful
    console.log('User registration successful:', response);

    return response;
  } catch (error) {
    // Log: User registration failed
    console.error('User registration failed:', error);

    throw error;
  }
};