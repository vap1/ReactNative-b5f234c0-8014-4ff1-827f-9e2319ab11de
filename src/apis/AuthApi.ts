
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

// Simulates the login API call
const loginUser = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
  console.log('Calling loginUser API');
  console.log('Request:', request);

  // Simulate API call and generate random data
  const response: UserLoginResponse = {
    success: true,
    message: 'Login successful',
    token: 'randomToken123',
  };

  console.log('Response:', response);
  return response;
};

export default loginUser;