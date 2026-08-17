'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useModalStore } from '@/store/modalStore';
import { useFavoritesList } from '@/hooks/useFavorites';
import PsychologistCard from '@/components/PsychologistCard/PsychologistCard';
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard';
import EmptyStateFavorites from '@/components/EmptyStateFavorites/EmptyStateFavorites';
import styles from './page.module.css';

export default function FavoritesPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading: isAuthLoading } = useAuthStore();
  const openLogin = useModalStore(state => state.openLogin);

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      router.replace('/');
      openLogin();
    }
  }, [isAuthLoading, isLoggedIn, router, openLogin]);

  const { data, isLoading, isError } = useFavoritesList();

  if (isAuthLoading || !isLoggedIn) return null;

  const favorites = data ?? [];
  const isEmpty = !isLoading && !isError && favorites.length === 0;

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Your Favorites</h1>
        <p className={styles.subtitle}>
          Specialists you&apos;ve saved for quick access.
        </p>
      </div>

      {isError && (
        <p className={styles.message}>Could not load your favorites.</p>
      )}

      {isLoading && (
        <ul className={styles.list}>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </ul>
      )}

      {isEmpty && (
        <div className={styles.empty}>
          <EmptyStateFavorites />
        </div>
      )}

      {!isLoading && favorites.length > 0 && (
        <ul className={styles.list}>
          {favorites.map(item => (
            <PsychologistCard key={item._id} psychologist={item} />
          ))}
        </ul>
      )}
    </div>
  );
}
