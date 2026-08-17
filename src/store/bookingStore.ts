import { create } from 'zustand';

interface BookingTarget {
  id: string;
  name: string;
  avatar_url: string;
}

interface BookingState {
  target: BookingTarget | null;
  openBooking: (target: BookingTarget) => void;
  closeBooking: () => void;
}

export const useBookingStore = create<BookingState>(set => ({
  target: null,
  openBooking: target => set({ target }),
  closeBooking: () => set({ target: null }),
}));
