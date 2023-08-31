
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
    // Log and throw any errors
    console.error('Error registering user:', error);
    throw error;
  }
};

export default registerUser;