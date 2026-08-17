'use client';

import { useEffect } from 'react';
import { api } from '@/lib/api';
import { getCurrentUser } from '@/lib/auth';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesStore } from '@/store/favoritesStore';

export default function SessionProvider() {
  const { setUser, clearUser } = useAuthStore();
  const setIds = useFavoritesStore(state => state.setIds);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data } = await api.get<{ isSessionActive: boolean }>(
          '/api/auth/session',
        );

        if (!data.isSessionActive) {
          clearUser();
          return;
        }

        const profile = await getCurrentUser();
        setUser(profile);
        setIds(profile.favorites.map(item => item._id));
      } catch {
        clearUser();
      }
    };

    restoreSession();
  }, [setUser, clearUser, setIds]);

  return null;
}
