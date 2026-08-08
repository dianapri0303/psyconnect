import { api } from './api';
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  UserProfile,
} from '@/types/user';

export const register = async (credentials: RegisterCredentials) => {
  const { data } = await api.post<AuthResponse>(
    '/api/auth/register',
    credentials,
  );
  return data;
};

export const login = async (credentials: LoginCredentials) => {
  const { data } = await api.post<AuthResponse>('/api/auth/login', credentials);
  return data;
};

export const logout = async () => {
  await api.post('/api/auth/logout');
};

export const getCurrentUser = async () => {
  const { data } = await api.get<UserProfile>('/api/users/current');
  return data;
};
