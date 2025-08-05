import axios from 'axios';

import { getToken } from './utils';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${getToken()}`,
//   },
// });

// Initialize cookies instance

// create an instance of the axios server
export const baseAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// use this baseAPI form only if you are visiting a form data or uploading a document
export const baseAPIForm = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// Cookie configuration

// Token management utilities using cookies

// // Request interceptor to add auth header and handle CORS
baseAPI.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

baseAPIForm.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default baseAPI;
