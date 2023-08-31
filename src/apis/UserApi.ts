
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';

export const registerUser = async (request: UserRegistrationRequest): Promise<UserRegistrationResponse> => {
  try {
    // Log the registration request
    console.log('Registration request:', request);

    // Generate a random success status
    const success = Math.random() < 0.5;

    // Generate a random message
    const message = success ? 'User registration successful' : 'User registration failed';

    // Create a random response
    const response: UserRegistrationResponse = {
      success,
      message,
    };

    // Log the registration response
    console.log('Registration response:', response);

    return response;
  } catch (error) {
    // Log any errors that occur during registration
    console.error('Registration error:', error);

    throw error;
  }
};