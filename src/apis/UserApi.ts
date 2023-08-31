
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';

const registerUser = async (request: UserRegistrationRequest): Promise<UserRegistrationResponse> => {
  try {
    // Log the start of the API call
    console.log('Starting user registration API call...');

    // Generate random data for the response
    const response: UserRegistrationResponse = {
      success: true,
      message: 'User registered successfully',
    };

    // Simulate an API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Log the API call completion
    console.log('User registration API call completed.');

    // Return the response
    return response;
  } catch (error) {
    // Log any errors that occur during the API call
    console.error('Error in user registration API call:', error);

    // Throw the error to be handled by the caller
    throw error;
  }
};

export default registerUser;