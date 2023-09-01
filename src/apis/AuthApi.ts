
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

// Function to simulate the login API call
const loginUser = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    console.log('Logging in...');
    // Simulate API call and generate random data
    const response: UserLoginResponse = {
      success: true,
      message: 'Login successful',
      token: 'randomToken123'
    };
    console.log('Login response:', response);
    return response;
  } catch (error) {
    console.log('Error occurred during login:', error);
    throw error;
  }
};

export default loginUser;