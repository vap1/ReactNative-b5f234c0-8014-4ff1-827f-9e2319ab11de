
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

const loginUser = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    console.log('Calling loginUser API');
    console.log('Request:', request);

    // Simulating API call and generating random data
    const response: UserLoginResponse = {
      success: true,
      message: 'Login successful',
      token: 'randomToken123',
    };

    console.log('Response:', response);
    return response;
  } catch (error) {
    console.error('Error in loginUser API:', error);
    throw error;
  }
};

export default loginUser;