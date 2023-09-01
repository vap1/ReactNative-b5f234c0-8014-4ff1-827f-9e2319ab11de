
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

// Function to simulate login API call
const loginUser = async (loginData: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    // Log: AuthApi - loginUser - Sending login request
    console.log('Sending login request:', loginData);

    // Simulating API call and generating random data
    const response: UserLoginResponse = {
      success: true,
      message: 'Login successful',
      token: 'random_token',
    };

    // Log: AuthApi - loginUser - Login response received
    console.log('Login response received:', response);

    return response;
  } catch (error) {
    // Log: AuthApi - loginUser - Error occurred during login
    console.error('Error occurred during login:', error);

    throw error;
  }
};

export default loginUser;