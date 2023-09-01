
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

// Function to simulate the login API call
const loginUser = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    // Log: Sending login request to the server
    console.log('Sending login request to the server');

    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate random data for the response
    const response: UserLoginResponse = {
      success: true,
      message: 'Login successful',
      token: 'randomToken123',
    };

    // Log: Login successful
    console.log('Login successful');

    return response;
  } catch (error) {
    // Log: Login failed
    console.error('Login failed:', error);

    // Generate random data for the error response
    const response: UserLoginResponse = {
      success: false,
      message: 'Login failed',
    };

    return response;
  }
};

export default loginUser;