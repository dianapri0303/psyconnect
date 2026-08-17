'use client';

import { useBookingStore } from '@/store/bookingStore';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import BookingForm from './BookingForm';

export default function BookingModal() {
  const { target, closeBooking } = useBookingStore();

  if (!target) return null;

  return (
    <ModalOverlay onClose={closeBooking} size="wide">
      <BookingForm
        psychologistId={target.id}
        psychologistName={target.name}
        psychologistAvatar={target.avatar_url}
        onClose={closeBooking}
      />
    </ModalOverlay>
  );
}
