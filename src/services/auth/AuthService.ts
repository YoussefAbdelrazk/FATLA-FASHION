'use server';

import baseAPI from '@/lib/config';
import { removeToken, setRefreshToken, setToken } from '@/lib/Cookie';

interface LoginResponse {
  token: string;
  refreshToken: string;
}


export const login = async (mobileNumber: string, password: string): Promise<LoginResponse> => {
  const api = await baseAPI();
  const response = await api.post(`/api/en/AdminAuth/login`, {
    mobileNumber,
    password,
  });
  setToken(response.data.token);
  setRefreshToken(response.data.refreshToken);
  console.log(response.data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  try {
    const api = await baseAPI();
    await api.post(`/api/en/AdminAuth/logout`);
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    removeToken();
  }
};

// Request OTP for password reset
export const requestOtp = async (mobileNumber: string): Promise<void> => {
  const api = await baseAPI();
  await api.post(`/api/en/AdminAuth/forget-password/request-otp`, {
    mobileNumber,
  });
};

// Verify OTP
export const verifyOtp = async (mobileNumber: string, otpCode: string): Promise<void> => {
  const api = await baseAPI();
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
  const api = await baseAPI();
  await api.post(`/api/en/AdminAuth/forget-password/reset`, {
    mobileNumber,
    newPassword,
    confirmPassword,
  });
};
