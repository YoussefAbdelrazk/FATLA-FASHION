import { baseAPI } from '@/lib/config';
import { removeToken, setRefreshToken, setToken } from '@/lib/utils';

interface LoginResponse {
  token: string;
  refreshToken: string;
}

export const login = async (mobileNumber: string, password: string): Promise<LoginResponse> => {
  const response = await baseAPI.post(`/api/en/AdminAuth/login`, {
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
    await baseAPI.post(`/api/en/AdminAuth/logout`);
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    // Always clear local tokens
    removeToken();
  }
};

// Request OTP for password reset
export const requestOtp = async (mobileNumber: string): Promise<void> => {
  await baseAPI.post(`/api/en/AdminAuth/forget-password/request-otp`, {
    mobileNumber,
  });
};

// Verify OTP
export const verifyOtp = async (mobileNumber: string, otpCode: string): Promise<void> => {
  await baseAPI.post(`/api/en/AdminAuth/forget-password/verify-otp`, {
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
  await baseAPI.post(`/api/en/AdminAuth/forget-password/reset`, {
    mobileNumber,
    newPassword,
    confirmPassword,
  });
};
