'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Logo from '../Logo/Logo';
import { logout } from '@/lib/auth';
import { useAuthStore } from '@/store/authStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useModalStore } from '@/store/modalStore';
import styles from './Header.module.css';

function HeartNavIcon() {
  return (
    <svg
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M6.66667 12.2333L5.7 11.3533C2.26667 8.24 0 6.18 0 3.66667C0 1.60667 1.61333 0 3.66667 0C4.82667 0 5.94 0.54 6.66667 1.38667C7.39333 0.54 8.50667 0 9.66667 0C11.72 0 13.3333 1.60667 13.3333 3.66667C13.3333 6.18 11.0667 8.24 7.63333 11.3533L6.66667 12.2333Z" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, isLoggedIn, isLoading, clearUser } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const clearIds = useFavoritesStore(state => state.clearIds);
  const { openLogin, openRegister } = useModalStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // сесія все одно завершується локально
    } finally {
      clearUser();
      clearIds();
      router.push('/');
      toast.success('You have been logged out.');
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/psychologists', label: 'Psychologists' },
    ...(!isLoading && isLoggedIn
      ? [{ href: '/favorites', label: 'Favorites', withIcon: true }]
      : []),
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />

        <nav className={styles.nav}>
          {navLinks.map(({ href, label, withIcon }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.link} ${pathname === href ? styles.active : ''}`}
            >
              {label}
              {withIcon && <HeartNavIcon />}
            </Link>
          ))}
        </nav>

        {isMounted && isLoading ? (
          <div className={styles.authSkeleton}>
            <span className={styles.skeletonAvatar} />
            <span className={styles.skeletonText} />
          </div>
        ) : isLoggedIn && user ? (
          <div className={styles.userArea}>
            <span className={styles.welcome}>Welcome, {user.name}</span>
            {user.avatarUrl && (
              <Image
                src={user.avatarUrl}
                alt={user.name}
                width={30}
                height={30}
                className={styles.avatar}
              />
            )}
            <button
              type="button"
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className={styles.auth}>
            <button
              type="button"
              className={styles.loginButton}
              onClick={openLogin}
            >
              Log In
            </button>
            <button
              type="button"
              className={styles.signupButton}
              onClick={openRegister}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
