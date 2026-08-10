import Link from 'next/link';
import {
  InstagramIcon,
  FacebookIcon,
  LinkedinIcon,
} from '../icons/SocialIcons';
import Logo from '../Logo/Logo';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Logo size="sm" />
        <p className={styles.copyright}>
          © 2025 PsyConnect. All rights reserved.
        </p>
        <ul className={styles.socials}>
          <li>
            <Link
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
