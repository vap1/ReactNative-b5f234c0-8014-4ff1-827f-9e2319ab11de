
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';

const registerUser = async (request: UserRegistrationRequest): Promise<UserRegistrationResponse> => {
  try {
    // Log the registration request
    console.log('Registering user:', request);

    // Generate a random success status
    const success = Math.random() < 0.5;

    // Generate a random message
    const message = success ? 'User registration successful' : 'User registration failed';

    // Return the response
    return { success, message };
  } catch (error) {
    // Log the error
    console.error('Error registering user:', error);

    // Return an error response
    return { success: false, message: 'An error occurred during user registration' };
  }
};

export default registerUser;