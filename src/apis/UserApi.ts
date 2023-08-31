
import { UserRegistrationRequest, UserRegistrationResponse, UserLoginRequest, UserLoginResponse } from '../types/Types';

const registerUser = async (request: UserRegistrationRequest): Promise<UserRegistrationResponse> => {
  console.log('Calling registerUser API');
  console.log('Request:', request);

  // Generate random data for response
  const response: UserRegistrationResponse = {
    success: true,
    message: 'User registration successful',
  };

  console.log('Response:', response);
  return response;
};

const loginUser = async (request: UserLoginRequest): Promise<UserLoginResponse> => {
  console.log('Calling loginUser API');
  console.log('Request:', request);

  // Generate random data for response
  const response: UserLoginResponse = {
    success: true,
    message: 'User login successful',
    token: 'random_token',
  };

  console.log('Response:', response);
  return response;
};

export { registerUser, loginUser };