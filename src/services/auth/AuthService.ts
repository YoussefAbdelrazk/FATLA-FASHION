'use server';
import api, { removeRefreshToken, removeToken, setRefreshToken, setToken } from '@/lib/config';

interface LoginResponse {
  token: string;
  refreshToken: string;
  user?: {
    mobileNumber: string;
    [key: string]: unknown;
  };
}

export const login = async (mobileNumber: string, password: string): Promise<LoginResponse> => {
  const response = await api.post(`/api/en/AdminAuth/login`, {
    mobileNumber,
    password,
  });
  setToken(response.data.token);
  setRefreshToken(response.data.refreshToken);

  return response.data;
};

export const logout = async (): Promise<void> => {
  try {
    // Call logout endpoint if available
    await api.post(`/api/en/AdminAuth/logout`);
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    // Always clear local tokens
    removeToken();
    removeRefreshToken();
  }
};

// Request OTP for password reset
export const requestOtp = async (mobileNumber: string): Promise<void> => {
  await api.post(`/api/en/AdminAuth/forget-password/request-otp`, {
    mobileNumber,
  });
};

// Verify OTP
export const verifyOtp = async (mobileNumber: string, otpCode: string): Promise<void> => {
  await api.post(`/api/en/AdminAuth/forget-password/verify-otp`, {
    mobileNumber,
    otpCode,
  });
};

// Reset password
export const resetPassword = async (
  mobileNumber: string,
  newPassword: string,
  confirmPassword: string,
): Promise<void> => {
  await api.post(`/api/en/AdminAuth/forget-password/reset`, {
    mobileNumber,
    newPassword,
    confirmPassword,
  });
};
