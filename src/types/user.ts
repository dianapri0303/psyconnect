import { Psychologist } from './psychologist';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface UserProfile extends User {
  favorites: Psychologist[];
}

export interface AuthResponse {
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}
