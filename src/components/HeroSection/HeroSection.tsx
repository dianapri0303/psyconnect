import Image from 'next/image';
import Link from 'next/link';
import {
  BadgeCheckIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  StarIcon,
} from '../icons/HeroIcons';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.tagline}>
          <BadgeCheckIcon />
          Your mental health matters
        </p>

        <h1 className={styles.title}>Find Your Perfect Psychologist Online</h1>

        <p className={styles.description}>
          Connect with licensed therapists and coaches who understand your
          needs. Start your journey to better mental health today.
        </p>

        <Link href="/psychologists" className={styles.button}>
          Get Started
          <ArrowRightIcon />
        </Link>
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src="/hero.png"
          alt="Woman having an online therapy session at home"
          width={630}
          height={498}
          priority
          className={styles.image}
        />

        <div className={`${styles.badge} ${styles.badgeTop}`}>
          <span className={`${styles.badgeIcon} ${styles.badgeIconGreen}`}>
            <ShieldCheckIcon />
          </span>
          Licensed Specialists
        </div>

        <div className={`${styles.badge} ${styles.badgeBottom}`}>
          <span className={`${styles.badgeIcon} ${styles.badgeIconStar}`}>
            <StarIcon />
          </span>
          4.8 Average Rating
        </div>
      </div>
    </section>
  );
}
