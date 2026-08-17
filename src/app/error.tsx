'use client';

import Link from 'next/link';
import styles from './error.module.css';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.text}>
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.button} onClick={reset}>
          Try again
        </button>
        <Link href="/" className={styles.link}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
