'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../Logo/Logo';
import styles from './Header.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/psychologists', label: 'Psychologists' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />

        <nav className={styles.nav}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${pathname === href ? styles.active : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.auth}>
          <button type="button" className={styles.loginButton}>
            Log In
          </button>
          <button type="button" className={styles.signupButton}>
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
