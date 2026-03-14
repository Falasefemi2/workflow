/** @format */

export type UserType = "admin" | "hr" | "employee" | "candidate";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  user_type: UserType;
  status: string | null;
  created_at: string;
  updated_at: string;
  password_hash: string;
}

export interface CreateUserPayload {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  user_type: UserType;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiError {
  error: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  new_password: string;
  token: string;
}

export interface GetUsersParams {
  limit?: number;
  offset?: number;
}

export interface GetUserByEmail {
  email: string;
}

export interface CurrentUser {
  user_id: string;
}

export interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  phone?: string;
}
