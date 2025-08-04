import axios from 'axios';
import { cookies } from 'next/headers';

export const API_BASE_URL = process.env.API_URL;
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Initialize cookies instance

// Cookie configuration
const COOKIE_CONFIG = {
  path: '/',
  secure: true,
  sameSite: 'strict' as const,
};

// Token management utilities using cookies
export const getToken = (): string | null => {
  return cookies().get('token')?.value || null;
};

export const setToken = (token: string): void => {
  cookies().set('token', token, COOKIE_CONFIG);
};

export const removeToken = (): void => {
  cookies().delete('token');
};

export const getRefreshToken = (): string | null => {
  return cookies().get('refreshToken')?.value || null;
};

export const setRefreshToken = (refreshToken: string): void => {
  cookies().set('refreshToken', refreshToken, COOKIE_CONFIG);
};

export const removeRefreshToken = (): void => {
  cookies().delete('refreshToken');
};

export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

// Request interceptor to add auth header and handle CORS
api.interceptors.request.use(
  config => {
    // Add token if available
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Note: CORS headers should be set by the server, not the client

    console.log('Making request to:', config.url);
    console.log('Request headers:', config.headers);

    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  },
);

// Response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('Response received:', response.status, response.data);
    console.log('Response headers:', response.headers);
    return response;
  },
  error => {
    console.error('Response error:', error.response?.status, error.response?.data);
    console.error('Error details:', error.message);
    console.error('Error response headers:', error.response?.headers);
    return Promise.reject(error);
  },
);

export default api;
