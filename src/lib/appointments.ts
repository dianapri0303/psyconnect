import { api } from './api';
import { AppointmentPayload } from '@/types/appointment';

export const createAppointment = async (payload: AppointmentPayload) => {
  const { data } = await api.post('/api/appointments', payload);
  return data;
};
