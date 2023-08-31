
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

const loginUser = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    // Log the start of the API call
    console.log('Starting loginUser API call...');

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate random data instead of calling the backend API endpoint
    const response: UserLoginResponse = {
      success: true,
      message: 'User logged in successfully',
      token: 'RANDOM_TOKEN',
    };

    // Log the API call success and response
    console.log('loginUser API call successful');
    console.log('Response:', response);

    return response;
  } catch (error) {
    // Log the API call failure and error
    console.log('loginUser API call failed');
    console.error('Error:', error);

    // Throw the error to be handled by the caller
    throw error;
  }
};

export default loginUser;