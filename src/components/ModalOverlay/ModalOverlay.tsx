'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '../icons/FormIcons';
import styles from './ModalOverlay.module.css';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
  variant?: 'light' | 'white';
  size?: 'default' | 'wide';
}

export default function ModalOverlay({
  onClose,
  children,
  variant = 'white',
  size = 'default',
}: Props) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`${styles.modal} ${variant === 'light' ? styles.modalLight : ''} ${size === 'wide' ? styles.modalWide : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
