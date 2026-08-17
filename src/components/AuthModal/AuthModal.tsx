'use client';

import { useModalStore } from '@/store/modalStore';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import LoginForm from '../AuthForms/LoginForm';
import RegistrationForm from '../AuthForms/RegistrationForm';

export default function AuthModal() {
  const { activeModal, closeModal } = useModalStore();

  if (!activeModal) return null;

  return (
    <ModalOverlay
      onClose={closeModal}
      variant={activeModal === 'register' ? 'light' : 'white'}
    >
      {activeModal === 'login' ? <LoginForm /> : <RegistrationForm />}
    </ModalOverlay>
  );
}
