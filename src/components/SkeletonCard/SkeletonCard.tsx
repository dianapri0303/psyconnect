import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
  return (
    <li className={styles.card} aria-hidden="true">
      <div className={styles.header}>
        <div className={styles.avatar} />
        <div className={styles.headerInfo}>
          <div className={styles.name} />
          <div className={styles.meta} />
          <div className={styles.tags}>
            <div className={styles.tag} />
            <div className={styles.tag} />
            <div className={styles.tag} />
          </div>
        </div>
      </div>

      <div className={styles.line} />
      <div className={styles.lineShort} />

      <div className={styles.conditions}>
        <div className={styles.condition} />
        <div className={styles.condition} />
        <div className={styles.condition} />
      </div>

      <div className={styles.footer}>
        <div className={styles.price} />
        <div className={styles.actions}>
          <div className={styles.button} />
          <div className={styles.button} />
        </div>
      </div>
    </li>
  );
}
