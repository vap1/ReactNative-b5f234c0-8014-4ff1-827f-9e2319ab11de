
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';

const registerUser = async (request: UserRegistrationRequest): Promise<UserRegistrationResponse> => {
  try {
    console.log('Calling registerUser API');
    console.log('Request:', request);

    // Generate random data for the response
    const response: UserRegistrationResponse = {
      success: true,
      message: 'User registered successfully',
    };

    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Error in registerUser API:', error);
    throw error;
  }
};

export default {
  registerUser,
};