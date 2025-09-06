import { login, logout, requestOtp, resetPassword, verifyOtp } from '@/services/auth/AuthService';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useAuthHook = () => {
  const router = useRouter();
  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: ({ mobileNumber, password }: { mobileNumber: string; password: string }) =>
      login(mobileNumber, password),
    onSuccess: data => {
      console.log('Login mutation success, data:', data);
      // console.log('Redirecting to /');
      router.push('/');
    },
    onError: error => {
      console.log('Login mutation error:', error);
      console.error('Login mutation error:', error);
    },
  });

  const { mutateAsync: requestOtpMutation, isPending: isRequestOtpPending } = useMutation({
    mutationFn: (mobileNumber: string) => requestOtp(mobileNumber),
    onSuccess: () => {
      router.push('/verify-otp');
    },
  });

  const { mutateAsync: verifyOtpMutation, isPending: isVerifyOtpPending } = useMutation({
    mutationFn: (data: { mobileNumber: string; otpCode: string }) =>
      verifyOtp(data.mobileNumber, data.otpCode),
    onSuccess: () => {
      router.push('/reset-password');
    },
  });

  const { mutateAsync: resetPasswordMutation, isPending: isResetPasswordPending } = useMutation({
    mutationFn: (data: { mobileNumber: string; newPassword: string; confirmPassword: string }) =>
      resetPassword(data.mobileNumber, data.newPassword, data.confirmPassword),
    onSuccess: () => {
      router.push('/login');
    },
  });

  const { mutateAsync: logoutMutation, isPending: isLogoutPending } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // Clear any client-side storage
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
      // Force page refresh and redirect to login
      window.location.href = '/login';
    },
  });

  return {
    loginMutation,
    isPending,
    requestOtpMutation,
    isRequestOtpPending,
    verifyOtpMutation,
    isVerifyOtpPending,
    resetPasswordMutation,
    isResetPasswordPending,
    logoutMutation,
    isLogoutPending,
  };
};
