
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

const loginUser = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    // Log the request details
    console.log('Login API Request:', request);

    // Generate random data for the response
    const response: UserLoginResponse = {
      success: true,
      message: 'Login successful',
      token: 'random_token',
    };

    // Log the response details
    console.log('Login API Response:', response);

    return response;
  } catch (error) {
    // Log any errors
    console.error('Login API Error:', error);

    // Generate random error message for the response
    const response: UserLoginResponse = {
      success: false,
      message: 'An error occurred during login',
    };

    // Log the response details
    console.log('Login API Response:', response);

    return response;
  }
};

export default loginUser;