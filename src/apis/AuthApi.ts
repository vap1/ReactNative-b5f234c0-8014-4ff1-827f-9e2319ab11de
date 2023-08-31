
import { UserLoginRequest, UserLoginResponse } from '../types/Types';

const loginUser = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
  console.log('Calling loginUser API');
  console.log('Request:', request);

  // Simulating API call and generating random data
  const response: UserLoginResponse = {
    success: true,
    message: 'Login successful',
    token: 'random_token',
  };

  console.log('Response:', response);
  return response;
};

export default loginUser;