import axios, { AxiosRequestConfig, Method } from 'axios';
import { getToken } from './Cookie';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;








export const baseAPI = async () => {
  const token = await getToken();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};
export const baseAPIForm = async () => {
  const token = await getToken();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

export async function callAPI<T>(
  method: Method,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  isForm: boolean = false
): Promise<T> {
  try {
    const api = isForm ? await baseAPIForm() : await baseAPI();

    const response = await api.request<T>({
      method,
      url,
      data,
      ...config,
    });

    return response.data;
  } catch (error) {
    console.error(`API error [${method.toUpperCase()} ${url}]`, error);
    throw error;
  }
}

// Cookie configuration

// Token management utilities using cookies

// // Request interceptor to add auth header and handle CORS
// baseAPI.interceptors.request.use(config => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   } else {
//     delete config.headers.Authorization;
//   }
//   return config;
// });

// baseAPIForm.interceptors.request.use(config => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   } else {
//     delete config.headers.Authorization;
//   }
//   return config;
// });

export default baseAPI;
