'use client';

import { useState } from 'react';
import { usePsychologists } from '@/hooks/usePsychologists';
import PsychologistCard from '@/components/PsychologistCard/PsychologistCard';
import FilterBar, { Filters } from '@/components/FilterBar/FilterBar';
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard';
import EmptyState from '@/components/EmptyState/EmptyState';
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

  const clearFilters = () =>
    setFilters({ specialization: '', approach: '', price: '' });

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

      {isError && <p className={styles.endMessage}>Something went wrong</p>}

      {isLoading && (
        <ul className={styles.list}>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </ul>
      )}

      {!isLoading && !isError && psychologists.length === 0 && (
        <div className={styles.empty}>
          <EmptyState onClearFilters={clearFilters} />
        </div>
      )}

      {!isLoading && psychologists.length > 0 && (
        <>
          <ul className={styles.list}>
            {psychologists.map(item => (
              <PsychologistCard key={item._id} psychologist={item} />
            ))}
          </ul>

          {hasNextPage && (
            <button
              type="button"
              className={styles.loadMore}
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage && (
                <span className={styles.spinner}>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M8.34375 16.6667C7.19792 16.6667 6.11806 16.4479 5.10417 16.0104C4.09028 15.5729 3.20486 14.9757 2.44792 14.2188C1.69097 13.4618 1.09375 12.5764 0.65625 11.5625C0.21875 10.5486 0 9.46875 0 8.32292C0 7.17708 0.21875 6.10069 0.65625 5.09375C1.09375 4.08681 1.69097 3.20486 2.44792 2.44792C3.20486 1.69097 4.09028 1.09375 5.10417 0.65625C6.11806 0.21875 7.19444 0 8.33333 0C8.56944 0 8.76736 0.0798611 8.92708 0.239583C9.08681 0.399306 9.16667 0.597222 9.16667 0.833333C9.16667 1.06944 9.08681 1.26736 8.92708 1.42708C8.76736 1.58681 8.56944 1.66667 8.33333 1.66667C6.48611 1.66667 4.91319 2.31597 3.61458 3.61458C2.31597 4.91319 1.66667 6.48611 1.66667 8.33333C1.66667 10.1806 2.31597 11.7535 3.61458 13.0521C4.91319 14.3507 6.48611 15 8.33333 15C10.1806 15 11.7535 14.3507 13.0521 13.0521C14.3507 11.7535 15 10.1806 15 8.33333C15 8.09722 15.0799 7.89931 15.2396 7.73958C15.3993 7.57986 15.5972 7.5 15.8333 7.5C16.0694 7.5 16.2674 7.57986 16.4271 7.73958C16.5868 7.89931 16.6667 8.09722 16.6667 8.33333C16.6667 9.47222 16.4479 10.5486 16.0104 11.5625C15.5729 12.5764 14.9757 13.4618 14.2188 14.2188C13.4618 14.9757 12.5799 15.5729 11.5729 16.0104C10.566 16.4479 9.48958 16.6667 8.34375 16.6667Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              )}
              Load more psychologists
            </button>
          )}

          {!hasNextPage && (
            <p className={styles.endMessage}>
              You&apos;ve seen all specialists.
            </p>
          )}
        </>
      )}
    </div>
  );
}
