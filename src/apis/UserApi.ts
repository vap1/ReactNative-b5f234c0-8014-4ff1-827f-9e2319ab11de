
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';

const registerUser = async (request: UserRegistrationRequest): Promise<UserRegistrationResponse> => {
  try {
    console.log('Calling registerUser API');
    // Generate random data for success response
    const response: UserRegistrationResponse = {
      success: true,
      message: 'User registration successful',
    };
    return response;
  } catch (error) {
    console.error('Error in registerUser API:', error);
    // Generate random data for error response
    const response: UserRegistrationResponse = {
      success: false,
      message: 'User registration failed',
    };
    return response;
  }
};

export default registerUser;