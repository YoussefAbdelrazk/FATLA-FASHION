import Cookies from 'js-cookie';

const COOKIE_CONFIG = {
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  path: '/',
  secure: true,
  sameSite: 'strict' as const,
};

export const getToken = () => {
  return Cookies.get('token') || null;
};

export const getRefreshToken = () => {
  return Cookies.get('refreshToken') || null;
};

export const setToken = (token: string) => {
  Cookies.set('token', token, COOKIE_CONFIG);
};

export const setRefreshToken = (refreshToken: string) => {
  Cookies.set('refreshToken', refreshToken, COOKIE_CONFIG);
};

export const removeToken = () => {
  Cookies.remove('token');
};

export const removeRefreshToken = () => {
  Cookies.remove('refreshToken');
};
