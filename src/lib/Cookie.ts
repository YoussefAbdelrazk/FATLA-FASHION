import { cookies } from 'next/headers';

const COOKIE_CONFIG = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
  secure: true,
  sameSite: 'strict' as const,
};

// Server-side token functions (for use in Server Components and Server Actions)
export const getToken = () => {
  return cookies().get('token')?.value || null;
};

export const getRefreshToken = () => {
  return cookies().get('refreshToken')?.value || null;
};

export const setToken = (token: string) => {
  cookies().set('token', token, COOKIE_CONFIG);
};

export const setRefreshToken = (refreshToken: string) => {
  cookies().set('refreshToken', refreshToken, COOKIE_CONFIG);
};

export const removeToken = () => {
  cookies().delete('token');
};

export const removeRefreshToken = () => {
  cookies().delete('refreshToken');
};

// Client-side token functions (for use in Client Components)
export const getClientToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  // Try to get token from localStorage as fallback
  return localStorage.getItem('token') || null;
};

export const setClientToken = (token: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
};

export const removeClientToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
};
