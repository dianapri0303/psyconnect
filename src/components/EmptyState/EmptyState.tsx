import styles from './EmptyState.module.css';

interface Props {
  onClearFilters: () => void;
}

export default function EmptyState({ onClearFilters }: Props) {
  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.icon}
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>

      <h2 className={styles.title}>No specialists found</h2>
      <p className={styles.text}>
        Try adjusting your filters to find the right specialist for you.
      </p>

      <button type="button" className={styles.button} onClick={onClearFilters}>
        Clear filters
      </button>
    </div>
  );
}
