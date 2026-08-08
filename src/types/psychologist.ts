export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Psychologist {
  _id: string;
  name: string;
  avatar_url: string;
  specialization: string[];
  approaches: string[];
  languages: string[];
  price_per_hour: number;
  experience_years: number;
  rating: number;
  reviews: Review[];
  about: string;
  conditions: string[];
  initial_consultation: boolean;
}

export interface PaginatedPsychologists {
  items: Psychologist[];
  total: number;
  page: number;
  limit: number;
}

export interface PsychologistsParams {
  specialization?: string;
  approach?: string;
  price_max?: number;
  page?: number;
  limit?: number;
}
