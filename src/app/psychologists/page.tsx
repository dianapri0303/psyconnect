'use client';

import { useState } from 'react';
import { usePsychologists } from '@/hooks/usePsychologists';
import PsychologistCard from '@/components/PsychologistCard/PsychologistCard';
import FilterBar, { Filters } from '@/components/FilterBar/FilterBar';
import styles from './page.module.css';

const priceMap: Record<string, number | undefined> = {
  'Under $50': 50,
  'Under $100': 100,
};

export default function PsychologistsPage() {
  const [filters, setFilters] = useState<Filters>({
    specialization: '',
    approach: '',
    price: '',
  });

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePsychologists({
    specialization: filters.specialization || undefined,
    approach: filters.approach || undefined,
    price_max: priceMap[filters.price],
  });

  const psychologists = data?.pages.flatMap(page => page.items) ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Find Your Psychologist</h1>
        <p className={styles.subtitle}>
          Browse our verified specialists and find the perfect match for your
          needs.
        </p>
      </div>

      <div className={styles.filters}>
        <FilterBar filters={filters} onChange={setFilters} />
      </div>

      {isError && <p>Something went wrong</p>}

      <ul className={styles.list}>
        {psychologists.map(item => (
          <PsychologistCard key={item._id} psychologist={item} />
        ))}
      </ul>

      {!isLoading && hasNextPage && (
        <button
          type="button"
          className={styles.loadMore}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more psychologists'}
        </button>
      )}

      {!isLoading && !hasNextPage && psychologists.length > 0 && (
        <p className={styles.endMessage}>You&apos;ve seen all specialists.</p>
      )}
    </div>
  );
}
