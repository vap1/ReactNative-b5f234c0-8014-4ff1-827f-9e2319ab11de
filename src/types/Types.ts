
interface User {
  name: string;
  email: string;
  contactInfo?: string;
  address?: string;
  profilePicture?: string;
}

interface UserRegistrationRequest {
  name: string;
  email: string;
  password: string;
}

interface UserRegistrationResponse {
  success: boolean;
  message: string;
}

interface UserLoginRequest {
  email: string;
  password: string;
}

interface UserLoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

interface UserProfileRequest {
  token: string;
}

interface UserProfileResponse {
  user: User;
}

interface UserProfileUpdateRequest {
  token: string;
  name?: string;
  contactInfo?: string;
  address?: string;
  profilePicture?: string;
}

interface UserProfileUpdateResponse {
  success: boolean;
  message: string;
}

interface AdminUserDetailsRequest {
  token: string;
}

interface AdminUserDetailsResponse {
  users: User[];
}

export {
  User,
  UserRegistrationRequest,
  UserRegistrationResponse,
  UserLoginRequest,
  UserLoginResponse,
  UserProfileRequest,
  UserProfileResponse,
  UserProfileUpdateRequest,
  UserProfileUpdateResponse,
  AdminUserDetailsRequest,
  AdminUserDetailsResponse,
};