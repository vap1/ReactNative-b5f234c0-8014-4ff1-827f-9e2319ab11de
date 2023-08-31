
// File: src/types/Types.ts

console.log('Types.ts: Start');

export interface User {
  name: string;
  email: string;
  contactInfo?: string;
  address?: string;
  profilePicture?: string;
}

console.log('Types.ts: User interface defined');

export interface UserRegistrationRequest {
  name: string;
  email: string;
  password: string;
}

console.log('Types.ts: UserRegistrationRequest interface defined');

export interface UserRegistrationResponse {
  success: boolean;
  message: string;
}

console.log('Types.ts: UserRegistrationResponse interface defined');

export interface UserLoginRequest {
  email: string;
  password: string;
}

console.log('Types.ts: UserLoginRequest interface defined');

export interface UserLoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

console.log('Types.ts: UserLoginResponse interface defined');

export interface UserProfileRequest {
  token: string;
}

console.log('Types.ts: UserProfileRequest interface defined');

export interface UserProfileResponse {
  user: User;
}

console.log('Types.ts: UserProfileResponse interface defined');

export interface UserProfileUpdateRequest {
  token: string;
  name?: string;
  contactInfo?: string;
  address?: string;
  profilePicture?: string;
}

console.log('Types.ts: UserProfileUpdateRequest interface defined');

export interface UserProfileUpdateResponse {
  success: boolean;
  message: string;
}

console.log('Types.ts: UserProfileUpdateResponse interface defined');

export interface AdminUserDetailsRequest {
  token: string;
}

console.log('Types.ts: AdminUserDetailsRequest interface defined');

export interface AdminUserDetailsResponse {
  users: User[];
}

console.log('Types.ts: AdminUserDetailsResponse interface defined');

console.log('Types.ts: End');