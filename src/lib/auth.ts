// Client-side authentication utilities

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token') || sessionStorage.getItem('token') || null;
  }
  return null;
};

export const setAuthToken = (token: string, rememberMe: boolean = false) => {
  if (typeof window !== 'undefined') {
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  }
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const logout = () => {
  // Clear all client-side storage
  if (typeof window !== 'undefined') {
    localStorage.clear();
    sessionStorage.clear();
  }
  // Force page refresh and redirect to login
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};
