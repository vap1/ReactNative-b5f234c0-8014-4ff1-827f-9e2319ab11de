
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

export const loginUser = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    // Log the login request
    console.log('Login request:', request);

    // Generate a random success status
    const success = Math.random() < 0.5;

    // Generate a random message
    const message = success ? 'User login successful' : 'User login failed';

    // Create a random response
    const response: UserLoginResponse = {
      success,
      message,
      token: success ? 'randomToken123' : undefined,
    };

    // Log the login response
    console.log('Login response:', response);

    return response;
  } catch (error) {
    // Log any errors that occur during login
    console.error('Login error:', error);

    throw error;
  }
};