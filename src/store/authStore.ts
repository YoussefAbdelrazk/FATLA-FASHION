import { removeToken, setToken } from '@/lib/Cookie';
import Cookies from 'js-cookie';
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  token: Cookies.get('token') || null,
  setToken: token => {
    console.log('Auth store setToken called with:', token);
    if (token) {
      setToken(token); // Set in cookies
      set({ token });
    } else {
      removeToken(); // Remove from cookies
      set({ token: null });
    }
    console.log('Auth store token after set:', useAuthStore.getState().token);
  },
  clearToken: () => {
    console.log('Auth store clearToken called');
    removeToken(); // Remove from cookies
    set({ token: null });
    console.log('Auth store token after clear:', useAuthStore.getState().token);
  },
}));
