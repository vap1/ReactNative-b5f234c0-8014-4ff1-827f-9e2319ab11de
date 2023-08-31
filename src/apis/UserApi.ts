
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';

const registerUser = async (request: UserRegistrationRequest): Promise<UserRegistrationResponse> => {
  try {
    // Log the registration request
    console.log('User registration request:', request);

    // Generate random data for the response
    const response: UserRegistrationResponse = {
      success: true,
      message: 'User registered successfully',
    };

    // Log the registration response
    console.log('User registration response:', response);

    return response;
  } catch (error) {
    // Log any errors
    console.error('Error registering user:', error);

    // Generate random data for the error response
    const response: UserRegistrationResponse = {
      success: false,
      message: 'Error registering user',
    };

    return response;
  }
};

export default {
  registerUser,
};