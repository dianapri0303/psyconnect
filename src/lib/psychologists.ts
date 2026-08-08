import { api } from './api';
import {
  PaginatedPsychologists,
  PsychologistsParams,
} from '@/types/psychologist';

export const getPsychologists = async (params: PsychologistsParams) => {
  const { data } = await api.get<PaginatedPsychologists>('/api/psychologists', {
    params,
  });
  return data;
};
