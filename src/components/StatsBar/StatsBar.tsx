import styles from './StatsBar.module.css';

const stats = [
  { value: '120+', label: 'Verified Specialists' },
  { value: '5,000+', label: 'Happy Clients' },
  { value: '10+', label: 'Years of Experience' },
];

export default function StatsBar() {
  return (
    <section className={styles.stats}>
      <ul className={styles.list}>
        {stats.map(({ value, label }) => (
          <li key={label} className={styles.item}>
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
