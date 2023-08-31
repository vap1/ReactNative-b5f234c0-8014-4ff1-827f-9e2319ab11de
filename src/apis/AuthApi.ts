
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

const loginUser = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    console.log('Sending login request:', request);

    // Simulating API call and generating random data
    const response: UserLoginResponse = {
      success: true,
      message: 'Login successful',
      token: 'random_token',
    };

    console.log('Received login response:', response);

    return response;
  } catch (error) {
    console.error('Error occurred during login:', error);

    // Simulating error response
    throw new Error('Login failed');
  }
};

export default loginUser;