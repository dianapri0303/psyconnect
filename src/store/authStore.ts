import { create } from 'zustand';
import { User } from '@/types/user';

const STORAGE_KEY = 'psyconnect-was-logged-in';

const getInitialLoading = () => {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(STORAGE_KEY) === 'true';
};

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isLoggedIn: false,
  isLoading: getInitialLoading(),
  setUser: user => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
    set({ user, isLoggedIn: true, isLoading: false });
  },
  clearUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    set({ user: null, isLoggedIn: false, isLoading: false });
  },
  setLoading: isLoading => set({ isLoading }),
}));
