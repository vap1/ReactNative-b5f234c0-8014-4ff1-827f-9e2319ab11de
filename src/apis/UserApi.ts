
import { UserRegistrationRequest, UserRegistrationResponse } from '../types/Types';

const registerUser = async (request: UserRegistrationRequest): Promise<UserRegistrationResponse> => {
  try {
    console.log('Registering user...');
    // Simulate API call and generate random data
    const response: UserRegistrationResponse = {
      success: true,
      message: 'User registered successfully!',
    };
    console.log('Registration response:', response);
    return response;
  } catch (error) {
    console.log('Error occurred during user registration:', error);
    throw error;
  }
};

export default registerUser;