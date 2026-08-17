import HeroSection from '@/components/HeroSection/HeroSection';
import StatsBar from '@/components/StatsBar/StatsBar';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <HeroSection />
      <StatsBar />
    </div>
  );
}
