
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

// Function to simulate the login API call
const loginUser = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    console.log('Making login API call...');
    console.log('Request:', request);

    // Simulate API call and generate random data
    const response: UserLoginResponse = {
      success: true,
      message: 'Login successful',
      token: 'random_token',
    };

    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export default loginUser;