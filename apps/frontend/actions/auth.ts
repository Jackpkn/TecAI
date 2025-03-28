import { apiClient } from "@/lib/api";

export interface UserRegisterProps {
  email: string;
  password: string;
  username?: string;
}

export type AuthResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: any;
};

export async function register({
  email,
  password,
  username,
}: UserRegisterProps): Promise<AuthResponse> {
  try {
    const response = await apiClient.post("/auth/register", {
      email,
      password,
      username,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response?.data) {
      return {
        success: false,
        message: error.response.data.message,
        errors: error.response.data.errors,
      };
    }
    return {
      success: false,
      message: error.message || "Registration failed",
    };
  }
}

export async function login({
  email,
  password,
}: Omit<UserRegisterProps, "username">): Promise<AuthResponse> {
  try {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response?.data) {
      return {
        success: false,
        message: error.response.data.message || "Invalid credentials",
        errors: error.response.data.errors,
      };
    }
    return {
      success: false,
      message: error.message || "Login failed",
    };
  }
}
