import { create } from 'zustand';
import { User } from '@/types/user';

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
  isLoading: true,
  setUser: user => set({ user, isLoggedIn: true, isLoading: false }),
  clearUser: () => set({ user: null, isLoggedIn: false, isLoading: false }),
  setLoading: isLoading => set({ isLoading }),
}));
