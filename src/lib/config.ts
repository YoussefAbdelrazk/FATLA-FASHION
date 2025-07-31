import axios from 'axios';
import Cookies from 'universal-cookie';

const baseURL = process.env.API_URL;
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Initialize cookies instance
const cookies = new Cookies();

// Cookie configuration
const COOKIE_CONFIG = {
  path: '/',
  secure: true,
};

// Token management utilities using cookies
export const getToken = (): string | null => {
  return cookies.get('token') || null;
};

export const setToken = (token: string): void => {
  cookies.set('token', token, COOKIE_CONFIG);
};

export const removeToken = (): void => {
  cookies.remove('token', { path: '/' });
};

export const getRefreshToken = (): string | null => {
  return cookies.get('refreshToken') || null;
};

export const setRefreshToken = (refreshToken: string): void => {
  cookies.set('refreshToken', refreshToken, COOKIE_CONFIG);
};

export const removeRefreshToken = (): void => {
  cookies.remove('refreshToken', { path: '/' });
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
