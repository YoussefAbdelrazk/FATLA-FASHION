'use server';

import { cookies } from 'next/headers';

const COOKIE_CONFIG = {
  expires: 1,
  path: '/',
  secure: true,
  sameSite: 'strict' as const,
};

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
