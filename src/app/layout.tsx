import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import 'modern-normalize/modern-normalize.css';
import './globals.css';
import styles from './layout.module.css';

import QueryProvider from '@/providers/QueryProvider';
import SessionProvider from '@/providers/SessionProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AuthModal from '@/components/AuthModal/AuthModal';
import BookingModal from '@/components/BookingModal/BookingModal';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'PsyConnect',
  description: 'Find and book licensed psychologists online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <QueryProvider>
          <SessionProvider />
          <div className={styles.wrapper}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
          </div>
          <AuthModal />
          <BookingModal />
          <Toaster
            position="bottom-right"
            containerStyle={{ bottom: 17, right: 16 }}
            toastOptions={{
              duration: 4000,
              style: {
                width: '360px',
                maxWidth: '360px',
                padding: '16px',
                border: '1px solid #e0e3e1',
                borderRadius: '12px',
                background: '#ffffff',
                boxShadow: '0 8px 24px 0 rgba(45, 106, 79, 0.12)',
                fontFamily: 'var(--font-manrope), sans-serif',
                fontSize: '14px',
                lineHeight: 1.43,
                color: '#181c1c',
              },
              success: {
                iconTheme: {
                  primary: '#0d6c4a',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ba1a1a',
                  secondary: '#ffffff',
                },
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
